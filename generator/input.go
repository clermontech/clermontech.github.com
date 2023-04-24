package main

import (
	"bufio"
	"context"
	"fmt"
	"io"
	"os"
	"os/exec"
)

var Editor string

func init() {
	env := os.Getenv("EDITOR")
	if env == "" {
		panic("$EDITOR not found")
	}

	bin, err := exec.LookPath(env)
	if err != nil {
		panic(fmt.Errorf("editor lookpath: %w", err))
	}

	Editor = bin
}

type Yes bool

func (y *Yes) UnmarshalText(v []byte) error {
	var vv bool
	switch string(v) {
	case "y", "Y":
		vv = true
	default:
		vv = false
	}

	*y = Yes(vv)
	return nil
}

func (y *Yes) Scan(state fmt.ScanState, verb rune) error {
	buf := make([]byte, 0, 1)
	for {
		r, _, err := state.ReadRune()
		if err != nil {
			if err == io.EOF {
				return y.UnmarshalText(buf)
			}
			return err
		}

		buf = append(buf, byte(r))
	}

}

func ReadInput(ctx context.Context) (ApiHour, error) {
	var ah ApiHour

	var v uint
	if err := Ask("ApiHour Version (ex: 54)", &v); err != nil {
		return ah, fmt.Errorf("ask: %w", err)
	}
	ah.Version = v

	var d Date
	if err := Ask("Date (ex: 2023-01-01)", &d); err != nil {
		return ah, fmt.Errorf("ask: %w", err)
	}
	ah.Date = d

	var l string
	if err := Ask("Location (ex: Centre Jean Richepin)", &l); err != nil {
		return ah, fmt.Errorf("ask: %w", err)
	}
	ah.Location = l

	var a string
	if err := Ask("Address (ex: 21 Rue J. Richepin, 63000 Clermont-Ferrand)", &a); err != nil {
		return ah, fmt.Errorf("ask: %w", err)
	}
	ah.Address = a

	var y Yes
	if err := Ask("Set an Eventbrite Id? y/N", &y); err != nil {
		return ah, fmt.Errorf("ask: %w", err)
	}
	if y {
		var eid uint
		if err := Ask("Eventbrite id", &eid); err != nil {
			return ah, fmt.Errorf("ask: %w", err)
		}
		ah.EventbriteId = eid
	}

	// talks
	oneLong := false
	for {
		var y Yes
		if err := Ask("Set a talk? y/N", &y); err != nil {
			return ah, fmt.Errorf("ask: %w", err)
		}
		if !y {
			break
		}

		var t Talk

		var a string
		if err := Ask("\tAuthor", &a); err != nil {
			return ah, fmt.Errorf("ask: %w", err)
		}
		t.Author = a

		var tt string
		if err := Ask("\tTitle", &tt); err != nil {
			return ah, fmt.Errorf("ask: %w", err)
		}
		t.Title = tt

		d, err := Edit(ctx)
		if err != nil {
			return ah, fmt.Errorf("edit: %w", err)
		}
		t.Description = d

		var l Yes
		if err := Ask("\tIs 30min? y/N", &l); err != nil {
			return ah, fmt.Errorf("ask: %w", err)
		}
		if l {
			t.Duration = 30
			oneLong = true
		} else {
			t.Duration = 15
		}

		ah.Talks = append(ah.Talks, t)

		// stop after 4 talks or 3 talks is we have a 30min talk.
		if len(ah.Talks) == 4 || (oneLong && len(ah.Talks) == 3) {
			break
		}
	}

	return ah, nil
}

func Ask(q string, v any) error {
	scanner := bufio.NewScanner(os.Stdin)
	for {
		fmt.Print(q, ": ")
		scanner.Scan()
		if _, err := fmt.Sscan(scanner.Text(), v); err != nil {
			fmt.Printf("err: %v\n", err)
			continue
		}

		break
	}

	if err := scanner.Err(); err != nil {
		return fmt.Errorf("reading standard input: %w", err)
	}
	return nil
}

func Edit(ctx context.Context) (string, error) {
	tempf, err := os.CreateTemp(os.TempDir(), "")
	if err != nil {
		return "", fmt.Errorf("create tmp: %w", err)
	}
	name := tempf.Name()
	tempf.Close()
	defer os.Remove(name)

	cmd := exec.CommandContext(ctx, Editor, name)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout

	if err := cmd.Run(); err != nil {
		return "", fmt.Errorf("run editor: %w", err)
	}

	b, err := os.ReadFile(name)
	if err != nil {
		return "", fmt.Errorf("read file: %w", err)
	}

	return string(b), nil
}
