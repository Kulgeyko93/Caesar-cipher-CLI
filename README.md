# Caesar-cipher-CLI

Encrypts only Latin letters, regardless of case.

# Instal

npm install

# Usage

CLI tool should accept 4 options (short alias and full name):

-s, --shift: a shift
-i, --input: an input file
-o, --output: an output file
-a, --action: an action encode/decode

# Usage example:

-a (--action) is encode
$ node my*caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
input.txt This is secret. Message about "*" symbol!

output.txt Aopz pz zljyla. Tlzzhnl hivba "\_" zftivs!

$ node my*caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
plain.txt This is secret. Message about "*" symbol!

encoded.txt Aopz pz zljyla. Tlzzhnl hivba "\_" zftivs!

-a (--action) is decode
Decoding encoded initial string with the same -s(--shift) number produces the initial string.
$ node my*caesar_cli --action decode --shift 7 --input encoded.txt --output plain.txt
encoded.txt Aopz pz zljyla. Tlzzhnl hivba "*" zftivs!

plain.txt This is secret. Message about "\_" symbol!

(Optional) Negative shift handling
$ node my*caesar_cli --action encode --shift -1 --input plain.txt --output encoded.txt
plain.txt This is secret. Message about "*" symbol!

encoded.txt Sghr hr rdbqds. Ldrrzfd zants "\_" rxlank!
