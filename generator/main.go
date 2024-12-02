package main

import (
	"context"
	"errors"
	"fmt"
	"os"
	"time"
)

func main() {
	ctx := context.Background()

	if err := run(ctx); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func Usage() {
	fmt.Println("Usage: ./generator [../_posts]")
}

func run(ctx context.Context) error {
	dir := "../_posts"
	if len(os.Args) > 2 {
		Usage()
		return errors.New("bad args")
	}
	if len(os.Args) == 2 {
		dir = os.Args[1]
	}

	ah, err := ReadInput(ctx)
	if err != nil {
		return fmt.Errorf("read input: %w", err)
	}

	filename := fmt.Sprintf("%s/%s-api-hour-%d.md",
		dir, time.Now().Format("2006-01-02"), ah.Version,
	)
	f, err := os.Create(filename)
	if err != nil {
		return fmt.Errorf("create file: %s: %w", filename, err)
	}
	defer f.Close()

	if err := ahTmpl.ExecuteTemplate(f, "apiHour.md.tpl", ah); err != nil {
		return fmt.Errorf("execute template: %w", err)
	}

	fmt.Println("post generated:", filename)

	return nil
}
