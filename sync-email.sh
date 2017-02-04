#!/bin/sh

if [ ! -f email -o email -ot email.asc ]; then
    gpg --decrypt --output email email.asc
    touch -r email.asc email
elif [ ! -f email.asc -o email -nt email.asc -o email-recipients -nt email.asc ]; then
    enc_email=`mktemp`
    sed -e '/^-----BEGIN PGP MESSAGE-----$/,$d' email.asc > "$enc_email"
    gpg --encrypt `sed -e 's/^/--recipient /' email-recipients` --armor --output - email >> "$enc_email"
    mv "$enc_email" email.asc

    touch -r email email.asc
else
    echo 'Everything is fine!'
fi
