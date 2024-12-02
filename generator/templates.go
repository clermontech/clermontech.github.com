package main

import (
	"embed"
	"text/template"
)

//go:embed templates/*
var templates embed.FS

var ahTmpl = template.Must(template.New("").ParseFS(templates, "templates/apiHour.md.tpl"))
