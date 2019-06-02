<li>
    <ul x-data-id="{{id_users}}">
        <li><img src="../images/profile/user.svg" alt="login" />zaloguj: @{{login}}</li>
        <li><img src="../images/profile/empty2.svg" alt="name" />imię: @{{profileName}}</li>
        <li><img src="../images/profile/empty2.svg" alt="surname" />nazwisko: @{{surname}}</li>
        <li><img src="../components/helpers/image.php?operation=get&subject=userPhoto&id={{id_users}}" /></li>

        <li><img src="../images/profile/mail.svg" alt="mail" />email: @{{email}}</li>
        <li><img src="../images/profile/sex.svg" alt="sex" />płeć: @{{sex}}</li>
        <li><img src="../images/profile/webpage.svg" alt="webpage" />@((web-page): {{webpage}}</li>
        <li><img src="../images/profile/empty2.svg" alt="registered" />zarejestrowany: {{preregistered}}</li>
        <li><img src="../images/profile/key.svg" alt="permissions"/>uprawnienia: {{permissions_id}}</li>
        <div class="submit change-permissions" alt="change-permissions">zmień upr.</div>
        <li><a href="mailto:'{{email}}'">Wyślij maila</a></li>
        <li>&circleddash;</li>
        <div class="submit remove-user">usuń</div>
    </ul>
</li>