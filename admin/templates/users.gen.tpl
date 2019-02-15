<li>
    <ul x-data-id="{{id_users}}">
        <li><img src="../images/profile/user.svg" alt="login" />@((Login)): @{{login}}</li>
        <li><img src="../images/profile/empty2.svg" alt="name" />@((name)): @{{profileName}}</li>
        <li><img src="../images/profile/empty2.svg" alt="surname" />@((surname)): @{{surname}}</li>
        <li><img src="../components/helpers/image.php?operation=get&subject=userPhoto&id={{id_users}}" /></li>

        <li><img src="../images/profile/mail.svg" alt="mail" />@((Email)): @{{email}}</li>
        <li><img src="../images/profile/sex.svg" alt="sex" />@((sex)): @{{sex}}</li>
        <li><img src="../images/profile/webpage.svg" alt="webpage" />@((web-page): {{webpage}}</li>
        <li><img src="../images/profile/empty2.svg" alt="registered" />@((registered)): {{preregistered}}</li>
        <li><img src="../images/profile/key.svg" alt="permissions"/>@((permissions)): {{permissions_id}}</li>
        <div class="submit change-permissions" alt="change-permissions">@((change-permissions))</div>
        <li><a href="mailto:'{{email}}'">@((send-mail))</a></li>
        <li>&circleddash;</li>
        <div class="submit remove-user">@((remove))</div>
    </ul>
</li>