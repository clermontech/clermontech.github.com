package main

import (
	"errors"
	"fmt"
	"io"
	"time"
)

var ErrInvalidDate = errors.New("invalid date")

type Date time.Time

func (d *Date) UnmarshalText(v []byte) error {
	t, err := time.Parse("2006-01-02", string(v))
	if err != nil {
		return ErrInvalidDate
	}

	*d = Date(t)
	return nil
}

func (d *Date) Scan(state fmt.ScanState, verb rune) error {
	buf := make([]byte, 0, 10)
	for {
		r, _, err := state.ReadRune()
		if err != nil {
			if err == io.EOF {
				return d.UnmarshalText(buf)
			}
			return err
		}

		buf = append(buf, byte(r))
	}

}

func (d Date) Format(format string) string {
	return time.Time(d).Format(format)
}
