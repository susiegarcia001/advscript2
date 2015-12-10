<?php

    class Structure {
        
        function header($title)
        {
            $result =
                "<!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset='UTF-8'>
                            <title>'.$title.'</title>
                            <link rel='stylesheet' type='text/css' href='style.css'>
                        </head>
                        <body>";
            return $result;
        }
    
        function footer()
        {
            $result = '</body>
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
                        <script src="script.js"></script>
                        </html>';
            return $result;
        }
        
    }
?>