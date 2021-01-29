import os, os.path, re

path = "/Users/gregjonason/01_output_files"
myfiles = os.listdir(path)
# its much faster if you compile your regexes before you
# actually use them in a loop
REGEXES = [(re.compile(r"(\d+) (\d+)\\nunknown piece\\n"), "\1 \2\\n\1 \2\\n"),
           (re.compile(r"(\d+) (\d+)\\nunknown piece\\nunknown piece\\n"), "\1 \2\\n\1 \2\\n\1 \2\\n")]

for f in myfiles:
    # split the filename and file extension for use in
    # renaming the output file
    file_name, file_extension = os.path.splitext(f)
    generated_output_file = "regex_" + file_name + file_extension

    if file_extension in ('.txt'):

        # Declare input and output files, open them,
        # and start working on each line.
        input_file = os.path.join(path, f)
        output_file = os.path.join(path, generated_output_file)

        with open(input_file, "r") as fi, open(output_file, "w") as fo:
            for line in fi:
                for search, replace in REGEXES:
                    line = search.sub(replace, line)
                fo.write(line)
        # both the input and output files are closed automatically
        # after the with statement closes
