# Caesar-cipher-CLI

Encrypts only Latin letters, regardless of case.

# Instal

npm install

# Usage

CLI tool should accept 5 options (short alias and full name):

-s, --shift: a shift<br />
-i, --input: an input file<br />
-o, --output: an output file<br />
-a, --action: an action encode/decode<br />
-m, --minus: an if yes then the step is negative, for other values ​​the step is positive. Щptional argument!!!<br />

# Usage example:

-a (--action) is encode<br />
$ node my*caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"<br />
input.txt This is secret. Message about "*" symbol!<br />

output.txt Aopz pz zljyla. Tlzzhnl hivba "\_" zftivs!<br />

$ node my*caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt<br />
plain.txt This is secret. Message about "*" symbol!<br />

encoded.txt Aopz pz zljyla. Tlzzhnl hivba "\_" zftivs!<br />

-a (--action) is decode<br />
Decoding encoded initial string with the same -s(--shift) number produces the initial string.<br />
$ node my*caesar_cli --action decode --shift 7 --input encoded.txt --output plain.txt<br />
encoded.txt Aopz pz zljyla. Tlzzhnl hivba "*" zftivs!<br />

plain.txt This is secret. Message about "\_" symbol!<br />

(Optional) Negative shift handling<br />
$ node my*caesar_cli --action encode --shift -1 --input plain.txt --output encoded.txt<br />
plain.txt This is secret. Message about "*" symbol!<br />

encoded.txt Sghr hr rdbqds. Ldrrzfd zants "\_" rxlank!<br />
