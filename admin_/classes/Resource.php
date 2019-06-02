<?php

class Resource
{
    private $name;
    private $mysqli;
    private $sql;
    private $where;
    private $orderBy;
    private $template;
    private $rowsNumber;

    public function __construct($name, $mysqli, $where = 1, $templatesPath)
    {
        $this->name = $name;
        $this->mysqli = $mysqli;

        $this->sql;
        $this->mysqli->set_charset('utf8');
        $this->where = $where; //$mysqli->real_escape_string($where);
        $this->orderBy="login";
        $this->prepare_bind();
        $this->template = file_get_contents($templatesPath . $this->name . '.tpl');

        $this->template = preg_replace('/@/', '', $this->template);

       
    }

    public function setOrderBy($order)
    {
        $i=1;
      
        $orderArray = explode("@", $order);

        if (count($orderArray) === 0) {
            $this->orderBy = "login";
            return;
        };
     
        
        $this->orderBy = $orderArray[0];

        for ($i = 1; $i < count($orderArray); $i++) {
            $this->orderBy .= ", " . $orderArray[$i];
        }
        $this->prepare_bind();
      
    }
 

    private function prepare_bind()
    {
        switch ($this->name) {
            case "users":
           
             


                $this->sql = $this->mysqli->query("SELECT *, profile.name AS profileName FROM users LEFT JOIN profile ON users.id = profile.id_users LEFT JOIN permissions_users ON permissions_users.users_id = users.id JOIN permissions ON permissions.id =permissions_users.permissions_id WHERE " . $this->where . " ORDER BY " . $this->orderBy);
                
                break;
            case "moderate":
                $this->sql = $this->mysqli->query("SELECT * FROM forum LEFT JOIN users ON forum.users_id=users.id WHERE " . $this->where);

                break;

        }
    }

    public function get()
    {

        $out = '<ul>';
        if($this->sql->num_rows===0) {
            return "<p style='color:#ff00ff; margin-left:100px; padding:60px; border: 1px solid #ffffff;'>Brak wyników o zadanych kryteriach</p>";
        }
        while (($row = $this->sql->fetch_assoc()) !== null) {

           
            $itemHTML = preg_replace_callback('/\{\{([^\}]*)\}\}/', function ($match) use (&$row) {

                return $row[$match[1]];
            }, $this->template);

            $out .= $itemHTML;
        }

        return $out . '</ul>';
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }
}
