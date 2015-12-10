<?php

    require('socket.php');

    
    $sql = "SELECT * FROM sales";
    $result = $db->query($sql);
    
    
    
    echo "<table border='1'>".
            "<tr>".
                "<th>ID:</th>".
                "<th>Name:</th>".
                "<th>Phone:</th>".
                "<th>Email:</th>",
                "<th>Zip:</th>",
                "<th>Contact:</th>",
                "<th>Make:</th>",
                "<th>Model:</th>",
                "<th>Engine:</th>".
            "<tr>";
                
                
    if ($result->num_rows > 0) {
        //output data of each row
        while($row = $result->fetch_assoc()) {
            echo "<tr>".
                    "<td>".$row["Id"]."</td>".
                    "<td>".$row["name"]."</td>".
                    "<td>".$row["phone"]."</td>".
                    "<td>".$row["email"]."</td>".
                    "<td>".$row["zip"]."</td>".
                    "<td>".$row["contact"]."</td>".
                    "<td>".$row["make"]."</td>".
                    "<td>".$row["model"]."</td>".
                    "<td>".$row["engine"]."</td>".
                "</tr>";       
        }
    }
    
    echo "</table>";
?>