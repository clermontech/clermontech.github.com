#!/bin/sh

if [ ! -f email -o email -ot email.asc ]; then
    gpg --decrypt email.asc > email
    touch -r email.asc email
elif [ ! -f email.asc -o email -nt email.asc -o email-recipients -nt email.asc ]; then
    gpg --encrypt `sed -e 's/^/--recipient /' email-recipients` --armor email
    touch -r email email.asc
else
    echo 'Everything is fine!'
fi
