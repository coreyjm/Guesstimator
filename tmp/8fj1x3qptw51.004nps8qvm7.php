
<nav class="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
  <div class="container">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="<?php echo $BASE.'/'; ?>">Guesstimator</a>
    </div>
  	<div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li <?php if ($page_head == 'About'): ?>class="active"<?php endif; ?>><a href="<?php echo $BASE.'/about'; ?>"><i class="icon-plus-sign icon-black"></i> About</a></li>
        <li <?php if ($page_head == 'Leaderboard'): ?>class="active"<?php endif; ?>><a href="<?php echo $BASE.'/user/leader'; ?>"><i class="icon-th icon-black"></i>Leaderboard</a></li>
        <li <?php if ($page_head == 'Create User'): ?>class="active"<?php endif; ?>><a href="<?php echo $BASE.'/user/create'; ?>"><i class="icon-plus-sign icon-black"></i> Create User</a></li>

          <?php if ($page_head == 'Update User'): ?>
            <li class="active"><a href="javascript:void(0);"><i class="icon-plus-sign icon-black"></i> Update</a></li>
          <?php endif; ?>
      </ul>
    </div>
  </div>
</nav>

<h1 class="headline"><?php echo $page_head; ?></h1>

            <?php if ($message): ?>
            <div class="alert alert-success">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong><?php echo $message; ?></strong>
            </div>
            <?php endif; ?>

