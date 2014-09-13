<form action="<?php echo $BASE.'/user/update'; ?>" method="post">

    <div class="form-group">
        <label>Name</label>
        <input type="text" id="name" name="name" value="<?php echo $POST['name']; ?>" class="input-xlarge" />
    </div>

    <div class="form-group">
        <label>Image</label>
        <input type="text" id="image" name="image" value="<?php echo $POST['image']; ?>" class="input-xlarge" />
    </div>

    <div class="form-group">
        <label>Score</label>
        <input type="text" id="score" name="score" value="<?php echo $POST['score']; ?>" class="input-xlarge" />
    </div>

    <div class="control-group">
            <input type="hidden" name="id" value="<?php echo $POST['id']; ?>" />
            <input type="hidden" name="update" value="update" />
            <button type="submit" class="btn btn-primary">Update</button>
    </div>

</form>

