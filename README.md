Storytelling-System-Dot-Rating-Widget
=====================================

An HTML5 widget for dot and health rating that is used in tabletop roleplaying games based on the Storytelling System (e.g. World of Darkness, Vampire the Masquerade etc). Uses jQuery.

Examples
========

You can see some basic examples live [here](https://dl.dropboxusercontent.com/u/62860879/Storytelling%20System%20-%20HTML5%20Dot%20Component/example.html).

Using the dot widget
======================

Include the stylesheet and javascript file in the head section of your page:

```html
<link rel='stylesheet' href='ssdot.css' type='text/css' />
<script src="ssdot.js"></script>
```

Create a span element with the ss-dot-rating class, give values to the data-dot-* attributes:

```html
<span id="Dexterity" class="ss-dot-rating" data-dot-title="Dexterity" data-dot-max="5" data-dot-min="1" data-dot-value="3"></span>
```

Call .DotRating() on it for initialization:

```js
$("#Dexterity").DotRating();
```

Now you can get the value using jQuery like this:

```js
$("#Dexterity").data("dot-value");
```

The data-dot-* attributes
======================

| Attribute | Type |	Description |
| ---- |:----:|:-------:|:----------- |
| data-dot-title | string | The title of the attribute/skill this rating represents. |
| data-dot-max | number | The maximum number of dots this rating has. |
| data-dot-min | number | The minimum number of dots this rating has. |
| data-dot-value | number | The default value of the attribute/skill |
| data-dot-is-squared | boolean | If the value is "true" the dot will appear squared and be marked with X |
| data-dot-color-empty | html color | Sets the color of the dot when its empty. |
| data-dot-color-marked | html color | Sets the color of the dot when its marked. |
| data-dot-color-border | html color | Sets the color of the dot's border. |


Using the health widget
======================

Include the stylesheet and javascript file in the head section of your page:

```html
<link rel='stylesheet' href='ssdot.css' type='text/css' />
<script src="ssdot.js"></script>
```

Create a span element with the ss-health-rating class, give values to the data-health-* attributes:

```html
<span id="health" class="ss-health-rating" data-health-title="health" data-health-max="20" data-health-bashing="3"></span>
```

Call .HealthRating() on it for initialization:

```js
$("#Health").HealthRating();
```

Now you can get the value using jQuery like this:

```js
$("#Health").data("health-bashing");
```

The data-health-* attributes
======================

| Attribute | Type |	Description |
| ---- |:----:|:-------:|:----------- |
| data-health-title | string | The title of the health rating it represents. |
| data-health-max | number | The maximum number of boxes this rating has. |
| data-health-bashing | number | The default amount of bashing damage. |
| data-health-lethal | number | The default amount of lethal damage. |
| data-health-aggravated | number | The default amount of aggravated damage. |
