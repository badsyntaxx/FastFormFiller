# FastFormFiller
Development
FastFormFiller
It can be tedious writing different bits of code to manipulate the DOM and fill in forms programmatically. Things like checking a checkrelative block w-full or selecting an option in a dropdown list. This plain, vanilla javascript plugin takes JSON data and uses it to fill out any form field.

Getting started
Install using NPM

Import FastFormFiller

Basic usage

Using a FETCH request
You can provide fff with a url to get form data. fff will use this url in a fetch request that expects a JSON object in return.


Response:
{
    "status": "Success",
    "message": "Form Filler completed successfully",
    "target": "#fetch-example",
    "leftovers": {},
    "unfilled": []
}
							
Name:
Bilbo Baggins
Species:

Hobbit
Have any hobbits leaf?:

Gender:
Male Female Wormself
Quote:
Go back? No good at all! Go sideways? Impossible! Go forward? Only thing to do! On we go!
Using a JSON object
fff can also use a straight JSON object to fill the form. So, you can also do you're own fetch request and feed fff the result as long as the result is JSON.


Response:
{
    "status": "Success",
    "message": "Form Filler completed successfully",
    "target": "#json-example",
    "leftovers": {},
    "unfilled": [
        "have_leaf"
    ]
}
							
Name:
Arwen
Species:

Elf
Have any hobbits leaf?:

Gender:
Male Female Wormself
Quote:
I would rather share one lifetime with you, than face all the ages of this world alone.
Using both
You can use both the URL and JSON options together. In this case the URL data will be your default data and the JSON will be your override data. In this example we override the name and quote data.


Response:
{
    "status": "Success",
    "message": "Form Filler completed successfully",
    "target": "#both-example",
    "leftovers": {},
    "unfilled": []
}
						
Name:
Frodo Baggins
Species:

Hobbit
Have any hobbits leaf?:

Gender:
Male Female Wormself
Quote:
I feel that as long as the Shire lies behind, safe and comfortable, I shall find wander more bearable.
Ignore specific fields
fff can also ignore specific fields if you don't want the user to have to fill those out manually. You can provide the ignore array to provide the input name or ID.

ignore: @type {array}

Response:
{
    "status": "Success",
    "message": "Form Filler completed successfully",
    "target": "#ignore-example",
    "leftovers": {},
    "unfilled": [
        "species",
        "have_leaf",
        "quote"
    ]
}
							
Name:
Grima Wormtongue
Species:

Have any hobbits leaf?:

Gender:
Male Female Wormself
Quote:
Leftover data
You may have leftover data in your fetch request or JSON object. Data that never gets put into the form because those fields don't exist of fff didn't recognize them for some reason. That data will be in the response as leftovers. In this case gray and brown.


Response:
{
    "status": "Success",
    "message": "Form Filler completed successfully",
    "target": "#leftovers-example",
    "leftovers": {
        "gray": "Yes",
        "brown": false
    },
    "unfilled": []
}
							
Name:
Gandolf
Species:

Maiar
Have any hobbits leaf?:

Gender:
Male Female Wormself
Quote:
All that is gold does not glitter, Not all those who wander are lost.
Unfilled data
fff will also inform you of which input fields were left unfilled / empty.


Response:
{
    "status": "Success",
    "message": "Form Filler completed successfully",
    "target": "#unfilled-example",
    "leftovers": {},
    "unfilled": [
        "species",
        "have_leaf",
        "quote",
        "gender"
    ]
}
							
Name:
Sauron
Species:

Have any hobbits leaf?:

Gender:
Male Female Wormself
Quote:
Thenables
fff will also inform you of which input fields were left thenable / empty.


Response:
{
    "status": "Success",
    "message": "Form Filler completed successfully",
    "target": "#thenable-example",
    "leftovers": {},
    "unfilled": []
}
							
