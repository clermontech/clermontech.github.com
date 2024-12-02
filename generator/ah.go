package main

type Talk struct {
	Author      string
	Title       string
	Description string
	Duration    uint
}

type ApiHour struct {
	Version      uint
	Date         Date
	Location     string
	Address      string
	EventbriteId uint
	Talks        []Talk
}
