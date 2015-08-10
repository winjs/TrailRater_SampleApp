(function () {
    "use strict";
   
    var app = WinJS.Application;
    //SplitView
    var mySplitView = window.mySplitView = { 
        splitView: null, 
        trailClicked: WinJS.UI.eventHandler(function (ev) {
            var trailId = ev.currentTarget.dataset.trailId;
            updateUI(allTrails[trailId]);
        }),
        homeClicked: WinJS.UI.eventHandler(function (ev) {
            //add remove tags
            document.getElementById("app").classList.add("show-home");
            document.getElementById("app").classList.remove("show-trail");
        }),
    };
    //END SPLIT VIEW

function updateUI(trail) {

        //add remove tags
        document.getElementById("app").classList.add("show-trail");
        document.getElementById("app").classList.remove("show-home");
        
        //update title
        var titleElt = document.body.querySelector(".trail-title");
        titleElt.textContent = trail.title;

        //update location
        var locationElt = document.body.querySelector(".trail-location");
        locationElt.textContent = trail.location;

        //update description
        var descriptionElt = document.body.querySelector(".trail-description");
        descriptionElt.textContent = trail.description;

        //update Flipview
        var flipViewElt = document.body.querySelector(".flipView");
        flipViewElt.winControl.itemDataSource = new WinJS.Binding.List(trail.pictureArray).dataSource;
        flipViewElt.winControl.forceLayout();//helps the browser render the flipView

        //update Rating
        var ratingElt = document.body.querySelector(".rating");
        ratingElt.winControl.averageRating = trail.averageRating;
        ratingElt.winControl.userRating = 0;
    }
    
     var allTrails = [
        {
            title: "Snoqualmie Falls Trail", averageRating: 2, location: "Kirkland, WA", preview: "images/Snoqualmie.jpg", pictureArray: [
                { type: "item", picture: "images/Snoqualmie.jpg" },
                { type: "item", picture: "images/Snoqualmie2.jpg" }

            ], description: "Snoqualmie Falls is one of Washington state's most popular scenic attractions. More than 1.5 million visitors come to the Falls every year. At the falls, you will find a two-acre park, gift shop, observation deck, the Salish Lodge and the famous 270 foot waterfall."
        },
        {
            title: "Foster Island Trail", averageRating: 4.5, location: "Bellevue, WA", preview: "images/Foster.jpg", pictureArray: [
                 { type: "item", picture: "images/Foster.jpg" },
                 { type: "item", picture: "images/Foster2.jpg" }

            ], description: "Foster Island Trail is a 2 mile loop trail located near Seattle, Washington that features a lake and is good for all skill levels. The trail offers a number of activity options and is accessible year-round."
        },
        {
            title: "Alki Trail", averageRating: 1.5, location: "Seattle, WA", preview: "images/Alki.jpg", pictureArray: [
                 { type: "item", picture: "images/Alki.jpg" },
                 { type: "item", picture: "images/Alki2.jpg" }
            ], description: "The Alki Trail rides along the northern and eastern shore of West Seattle along Alki Avenue. Largely riding on a widened sidewalk, separated from traffic by a parking lane and curb, traffic on the trail is separated for bikes and walkers, providing a less stressful experience for walkers and bikers alike. "
        },
        {
            title: "Chelan Lakeshore Trail", averageRating: 5, location: "Lake Chelan, WA", preview: "images/LakeChelan.jpg", pictureArray: [
                 { type: "item", picture: "images/LakeChelan.jpg" },
                 { type: "item", picture: "images/LakeChelan2.jpg" }

            ], description: "Looking for an early-season backpack featuring craggy, snow-capped peaks, a sapphire-blue lake, wildflowers, and a trail that’s regularly maintained by WTA volunteers? The 17-mile thru-hike on the Chelan Lakeshore Trail might be just the thing for you. "
        },
        {
            title: "Cascade Pass", averageRating: 2.5, location: "North Cascades, WA", preview: "images/CascadePass.jpg", pictureArray: [
                 { type: "item", picture: "images/CascadePass.jpg" },
                 { type: "item", picture: "images/CascadePass2.jpg" }
            ], description: "At Cascade Pass, the wow factor far exceeds the “ow” factor – perhaps no other trail in the state delivers as much reward for the effort. From the high peaks on either side of the pass, verdant meadows curve down to a saddle that offers sweeping views of nearby valleys, glaciers, mountains, and passing wildlife."
        }
    ]
    //FlipView
    var array = [
            { type: "item", picture: "/images/Alki.jpg" }
    ];
    var bindingList = new WinJS.Binding.List(array);
    var DefaultData = window.DefaultData = {
        bindingList: bindingList,
        array: array
    }
    // FlipView
    
    var trailNameToID = {
        "Snoqualmie Falls Trail": 0,
        "Foster Island Trail": 1,
        "Alki Trail": 2,
        "Chelan Lakeshore Trail": 3,
        "Cascade Pass": 4,
    }
    //create an array of trails to turn the allTrails object into an array
    var trailArray = [];

    //add each trail in the allTrails object into the trailArray
    for (var i = 0; i < 5 ; ++i) { 
            trailArray.push(allTrails[i]);
    }

    //create a binding list out of the trailArray we just created 
    var myList = window.myList = {
        data: new WinJS.Binding.List(trailArray)
    };

    //Projections
        function alpha(first, second) {
            if ((first.title).localeCompare(second.title) == 0)
                return 0;
            else if ((first.title).localeCompare(second.title) == 1)
                 return 1;
            else
                 return -1;
        }
        function descendCompare(first, second) {
            if (first.averageRating == second.averageRating)
                return 0;
            else if (first.averageRating < second.averageRating)
                 return 1;
            else
                 return -1;
        }
        var sortedList = myList.data.createSorted(descendCompare);
        var alphabeticalList = myList.data.createSorted(alpha);

        myList.sortedList = sortedList;
        myList.alphabeticalList = alphabeticalList;
    //End Projections

    //processAll
    WinJS.UI.processAll().then(function () {
        mySplitView.splitView = document.querySelector(".splitView").winControl;
        new WinJS.UI._WinKeyboard(mySplitView.splitView.paneElement);
        //makes the splitView adaptable to screen size

        //allows listview to navigate on click
        var listView = document.getElementById("listView").winControl;
        listView.oniteminvoked = function (ev) {
            ev.detail.itemPromise.then(function (item) {
                var title = item.data.title;
                var trailId = trailNameToID[title];
                updateUI(allTrails[trailId]);
            })
        }
    });

    app.start();
})();
