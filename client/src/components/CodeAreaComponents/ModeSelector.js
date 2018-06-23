import React from "react" ;

const modeSelector = (props) => {

    const lang_obj = {
        'C': {
            'mode': 'text/x-csrc',
            'value': "#include <stdio.h>\nint main(void){\n\tprintf(\"Hello World\");\n}"
        },
        'C++': {
            'mode': 'text/x-c++src',
            'value': "#include<iostream>\nusing namespace std;\nint main(){\n\tcout<<\"Hello World\";\n\treturn 0;\n}"
        },
        'Java': {
            'mode': 'text/x-java',
            'value': "public class Main {\n" +
                    "    public static void main(String[] args) {\n" +
                    "        System.out.println(\"Hello World\");\n" +
                    "    }\n" +
                    "}"
        },
        'C#': {
            'mode': 'text/x-objectivec',
            'value': "using System;\n" +
                     "\n" +
                     "class Program\n" +
                     "{\n" +
                     "    static void Main(string[] args)\n" +
                     "    {\n" +
                     "        Console.WriteLine(\"Hello World\");\n" +
                     "    }\n" +
                     "}"
        },
        'Python3': {
            'mode': {
                'name': 'python',
                'version': '3',
                'singleLineStringErrors': 'false'
            },
            'value': "print('Hello World')"
        },
        'Python2': {
            'mode': {
                'name': 'python',
                'version': '2',
                'singleLineStringErrors': 'false'
            },
            'value': "print 'Hello World' "
        },
        'Javascript': {
            'mode': 'javascript',
            'value': "console.log(\"Hello World\");"
        },
        'Ruby': {
            'mode': 'text/x-ruby',
            'value': "puts \"Hello World\""
        }
    };

    

    return(
      <div className="form-group">
        <select name="modes"  className="form-control selecting" onChange = {(e) => {props.change(e.target.value,lang_obj[e.target.value].mode,lang_obj[e.target.value].value);console.log('c')}}>
        <option value="C" selected={props.lang === 'C'}>C</option>
        <option value="C++" selected={props.lang === 'C++'}>C++</option>
        <option value="Java" selected={props.lang === 'Java'}>Java</option>
        <option value="Javascript"  selected={props.lang === 'Javascript'}>Javascript</option>
        <option value="C#" selected={props.lang === 'C#'}>C#</option>
        <option value="Ruby" selected={props.lang === 'Ruby'}>Ruby</option>
        <option value="Python3" selected={props.lang === 'Python3'}>Python 3</option>
        <option value="Python2" selected={props.lang === 'Python2'}>Python 2</option>

        </select>
        </div>
    );

} 


export default modeSelector