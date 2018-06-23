 //CODEMIRROR
 
    // Language Object:
    var lang_obj = {
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
            'value': "class HelloWorldApp {\n" +
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
                name: 'python',
                version: 3,
                singleLineStringErrors: false
            },
            'value': "print('Hello World')"
        },
        'Python2': {
            'mode': {
                name: 'python',
                version: 2,
                singleLineStringErrors: false
            },
            'value': "print 'Hello World' "
        },
        'Javascript': {
            'mode': 'javascript',
            'value': "console.log(\"Hello World\");"
        },
        'Ruby': {
            'mode': 'text/x-ruby',
            'value': 'puts "Hello World"'
        }
    };

    // Editor
    var editor = CodeMirror(document.getElementById('codeeditor'), {
        mode: lang_obj['C']['mode'],
        value: lang_obj['C']['value'],
        tabSize: 4,
        lineNumbers: true,
        matchBrackets: true,
        keyMap: "sublime"
    });

    // Theme
    var inputTheme = document.getElementById("selectTheme");
    function selectTheme() {
        var theme = inputTheme.options[inputTheme.selectedIndex].textContent;
        editor.setOption("theme", theme);
        //location.hash = "#" + theme;
    }

    // Language
    var inputLanguage = document.getElementById("selectLanguage");
    function selectLanguage() {
        var lang = inputLanguage.options[inputLanguage.selectedIndex].textContent;
        editor.setOption("mode", lang_obj[lang]['mode']);
        editor.setOption("value", lang_obj[lang]['value']);
    }



// JUDGE0

    function post(url, data, headers, success) {
        $.ajax({
            contentType: 'application/json',
            type: "POST",
            url: url,
            data: data,
            success: success
        });
    };


    var headers = {
        'Content-Type': 'application/json'
    };

    var lang_to_code = {
        "C": "4",
        "C++": "10",
        "C#": "16",
        "Java": "27",
        "Javascript": "29",
        "Python3": "34",
        "Pyhthon2": "36",
        "Ruby": "38"
    };

    function getData() {
        var data = {
            "source_code": editor.getValue(),
            "language_id": lang_to_code[inputLanguage.options[inputLanguage.selectedIndex].textContent],
            "number_of_runs": "1",
            "stdin": "Judge0",
            "cpu_time_limit": "2",
            "cpu_extra_time": "0.5",
            "wall_time_limit": "5",
            "memory_limit": "128000",
            "stack_limit": "64000",
            "max_processes_and_or_threads": "30",
            "enable_per_process_and_thread_time_limit": false,
            "enable_per_process_and_thread_memory_limit": true,
            "max_file_size": "1024"
        };

        return data;
    }


    var run_url = '/run';

    function write_to_html(out_data) {
        var stdout = out_data["stdout"];
        var time = out_data["time"];
        var status = unescape(out_data["status"]["description"]);
        
        $('#output_status').html('<b>Status:</b> ' + status);
        $('#output_time').html('<b>Time:</b> ' + time);
        $('#output_stdout').html('<b>Output:</b><br> <textarea rows="10" style="border: none">' + stdout + '</textarea>');
    }

    $('#compile-run').click(function(e) {
        e.preventDefault();
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: run_url,
                data: JSON.stringify(getData()),
                dataType: 'json',
                crossDomain: true,
                success: function(data) {
                    console.log('success');
                    console.log(JSON.stringify(data));
                    write_to_html(data);

                }
            });
    });


//Socket

    var socket = io();

    socket.on('connect', function() {
        var room_id = window.location.pathname.slice(7);
        console.log('Connected to ' + room_id);
    });

    socket.on('disconnect', function () {
        console.log('Disconnected from server');
    });

    
