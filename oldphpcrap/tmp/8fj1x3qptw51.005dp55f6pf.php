<div class="container-fluid">
    <table class="table-striped" width="100%">
    <thead>
    <tr>
        <th scope="col">Player</th>
        <th scope="col">Score</th>
        <!--<th scope="col">Action</th>-->
    </tr>
    </thead>

    <tbody>
    <?php foreach (($users?:array()) as $user): ?>
        <tr>
            <td><img class="twitpic" src="<?php echo trim($user['image']); ?>"> <?php echo trim($user['name']); ?></td>
            <td><?php echo trim($user['score']); ?></td>
            <td><a href="<?php echo $BASE.'/user/update/'. $user['id']; ?>" class="btn btn-primary"><i class="icon-edit icon-white"></i> Edit</a>
                &nbsp; <a href="<?php echo $BASE.'/user/delete/'. $user['id']; ?>" class="btn btn-danger"><i class="icon-remove icon-white"></i>
                    Delete</a></td>

        </tr>
    <?php endforeach; ?>
    </tbody>

</table>
</div>
