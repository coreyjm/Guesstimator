<form action="<?php echo $BASE.'/user/create'; ?>" method="post">
    <div class="form-group">
        <label>Name</label>
        <input type="text" id="name" name="name" value="" class="input-xlarge" />
    </div>

    <div class="form-group">
        <label>Image</label>
        <input type="text" id="image" name="image" value="" class="input-xlarge" />
    </div>

    <div class="form-group">
        <label>Score</label>
        <input type="text" id="score" name="score" value="" class="input-xlarge" />
    </div>
    <div class="control-group">
            <input type="hidden" name="create" value="create" />         
            <button type="submit" class="btn btn-primary">Add User</button>
    </div>

</form>
