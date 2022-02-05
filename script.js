


  //Create constants and other variables to be called later
  //Set up format for moment.js
    const iD = false;
    const now = moment().format('MMMM Do YYYY');
    let hour24 = moment().format('H');
    let hour12 = moment().format('h');


    //If the iD is false then the hour24 is 13 and hour12 is 1
    if (iD) {
        hour24 = 13;
        hour12 = 1;
      }
    
      //Sets current date in the header
        let $headerDate = $('#currentDay');
        $headerDate.text(now);
  
        //Pulls all info from local data if previously saved
        let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
    
            //If there is data in storedPlans then fill the previousArray with the info
            if (storedPlans !== null) {

                previousArray = storedPlans;

                }
                else {
          
                  previousArray = new Array(9);
                }
                  
    
                //Setting the var planner to the HTML id plannerContainer
                let $planner = $('#plannerContainer');
            
    
  
                    //A for loop that creates the scheduler
                    //From the hours 8am to 4pm
                    //Adds attributes, classes, etc to format each part of the scheduler grid
                    for (let hour = 8; hour <= 16; hour++) {
        
                        let index = hour - 8;
        
                        let $rowDiv = $('<div>');
                        $rowDiv.addClass('row');
                        $rowDiv.attr('hourIndex', hour);
        
                        let $col1 = $('<div>');
                        $col1.addClass('col-md-1');
        
                        let $col2 = $('<div>');
                        $col2.addClass('col-md-2');
        
                        let $col3 = $('<div>');
                        $col3.addClass('col-md-9');

                        const $timeEl = $('<span>');

                        let hourDis = 0;
                        let time = "  ";

                        //If the hour is greater thsn 12, add PM
                        if (hour > 12) { 

                            hourDis = hour - 12;
                            time = "pm";

                            }

                        //If the hour is not greater than 12, then set it to AM
                        else {

                            hourDis = hour;
                            time = "am";

                            }

                        //Adds the times created above into the actual scheduler
                        $timeEl.text(`${hourDis} ${time}`);
                    
                        //Sets the var plan to a new section for inputs
                        //Designates the attributes and the value for the input
                        let $plan = $('<input>');
                        $plan.attr('id', `input-${index}`);
                        $plan.val( previousArray[index] );

                        //Adds the save button with attributes
                        let $saveBtn = $('<p>');
                        $saveBtn.attr('class', "far fa-save saveIcon");
                        $saveBtn.attr('id', `saveid-${index}`);
                        $saveBtn.attr('saveId', index);
                       
                        //Appends the col2 we created
                        $rowDiv.append($col2);
                        $col2.append($timeEl);
                    
                        //Appends the col3 we created
                        $rowDiv.append($col3);
                        $col3.append($plan);

                        //Appends the col1 we created
                        $rowDiv.append($col1);
                        $col1.append($saveBtn);

                        rowColor($rowDiv, hour);
                        $planner.append($rowDiv);

      };

    //Decides color of row based upon current hour of the day
    function rowColor ($hourRow, hour) { 
  
      if ( hour < hour24) {
        $hourRow.css("background-color", "#d3d3d3")

      } else if ( hour > hour24) {
        $hourRow.css("background-color", "#77dd77")

      } else {
        $hourRow.css("background-color", "#ff6961")
      }
    };


      //Calls the function on click
      //Creates var so that they can be saved properly for recall out of local storage later
      $(document).on('click', 'p', function(event) {
        event.preventDefault();  
    
        let $index = $(this).attr('saveId');
        let inputId = '#input-' + $index;
        let $value = $(inputId).val();
    
        previousArray[$index] = $value;
        localStorage.setItem("storedPlans", JSON.stringify(previousArray));

      });
