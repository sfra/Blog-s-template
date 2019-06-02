<?php
$out.=<<<EOT
            <li>
                    <ul x-data-id="{$row['id_users']}">
                        <li><img src="../images/profile/user.svg" alt="login" />login: {$row['login']}</li>
                        <li><img src="../images/profile/empty2.svg" alt="name"/>imię: {$row['profileName']}</li>
                        <li><img src="../images/profile/empty2.svg" alt="surname" />nazwisko: {$row['surname']}</li>
                        <li><img src="../images/profile/mail.svg" alt="email" />email: {$row['email']}</li>
                        <li><img src="../images/profile/sex.svg" alt="sex" />płeć: {$row['sex']}</li>
                        <li><img src="../images/profile/webpage.svg" alt="webpage" />strona www: {$row['webpage']}</li>
                        <li><img src="../images/profile/empty2.svg" alt="registered" />zarejestrowany: {$row['preregistered']}</li>
                        <li><img src="../images/profile/key.svg" alt="permissions" />uprawnienia: {$row['permissions_id']}</li><div class="submit change-permissions">zmień</div>
                        <li><a href="mailto:{$row['email']}">Wyslij maila</a></li>
                </ul>
            </li>
EOT;

?>