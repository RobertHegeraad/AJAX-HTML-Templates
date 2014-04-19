AJAX-HTML-Templates
===================

AJAX-HTML-Templates is an easy way to keep your HTML seperated from you AJAX calls and place the data returned by those calls in templates on the page.

Here's an example of how you can organize your HTML templates and PHP files:

index.html
	/js/template.jquery.js
	/php/comments.php
	/templates/comment.html

And here is how to use it:

```javascript
$('#comments').template({
    template: 'templates/comment.html',
    file: 'php/comments.php',
    action: 'append',
    data: { "last_max_id": last_max_id },
});
```

Imagine the PHP file comments.php being called with AJAX and returning comments in an object like so:

```php
// Get comments from a database

// Return the comments
echo json_encode(array(
   array('username' => 'User 1', 'comment' => 'Comment 1', 'profile_image' => 'img/user.jpg'),
   array('username' => 'User 2', 'comment' => 'Comment 2', 'profile_image' => 'img/user.jpg'),
   array('username' => 'User 3', 'comment' => 'Comment 3', 'profile_image' => 'img/user.jpg')
));
```

And recieved by the plugin like so:

```javascript
[
	{ 'username': 'User 1', 'comment': 'Comment 1', 'profile_image': 'img/user.jpg' },
	{ 'username': 'User 2', 'comment': 'Comment 2', 'profile_image': 'img/user.jpg' },
	{ 'username': 'User 3', 'comment': 'Comment 3', 'profile_image': 'img/user.jpg' }
]
``` 

These values will then be put in the HTML template you've passed to the plugin.

```html
<li class="comment">

    <img class="comment-profile-image" src="{{profile_image}}"/>

    <h2 class="comment-username">{{username}}</h2>

    <p class="comment-text">{{comment}}</p>

    <p>Desktop comment template</p>
</li>
```

Now all the values for each object will replace the placeholders in the HTML and will be displayed on the page.

Here is the full example

```javascript
$(document).on('click', '#load-more', function() {

    // Load the template for #comments
    $('#comments').template({
        template: 'templates/comment.html',
        file: 'php/comments.php',
        action: 'append',
        data: { "last_max_id": last_max_id },
        before: function() {
            // Add Throbber
        },
        after: function() {
            // Remove Throbber
        }
    });
});
```

Mobile
------------------------------------------------------------------------------------------------------

With the mobile propertie you can specify that you have an alternative HTML template for when the page is viewed on a mobile device. If you set this to true it will look for the HTML template you've passed with the 'mobile-' prefix. So if you pass 'template': 'templates/comment.html', it will look for the template 'templates/mobile-comment.html'.

This can be used to load a more simple template, for example one without profile images in the comments.

Properties
------------------------------------------------------------------------------------------------------

```javascript
action: 'append',       // How to put the rendered template on the page, append, prepend, replace, before or after
effect: 'slideDown',    // Which effect to use when putting the rendered template on the page
speed: 1000,            // The speed of the above effect
data: {},               // The data to send to the PHP script
mobile: false,          // Wether or not to load a different template with the 'mobile-' prefix when the page if viewed on a mobile platform
before: false,          // Optional callback function to use before the rendered template is put on the page
after: false            // Optional callback function to use after the rendered template is put on the page
```