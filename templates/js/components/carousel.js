/*********************************************************************
 * Carousel:
 *
 * To change the duration of the carousel you must change the interval timer
 * in the Javascript as well as three of the animation times in the CSS file.
 *
 * To add slides to the carousel you will need to add them in the HTML  similarly
 * to how they are already set up. Then make sure the if statements below accounts
 * for the correct amount of slides.
 *
 * Changing the time at which slides/text change is done completely in the CSS
 * using keyframes.
 *
 * ******************************************************************/



export default class Carousel extends React.Component {

    constructor() {
        super();

        this.state = {
            carouselInterval: null,
            carouselTimeout: null,
            ondeckTab: 1,
            currentTab: 0,
            nextTab: -1
        };

        this.carouselSlide = this.carouselSlide.bind(this);
        this.carouselArrowClick = this.carouselArrowClick.bind(this);
        this.swapTab = this.swapTab.bind(this);
        this.stopCarousel = this.stopCarousel.bind(this);
    }

    //If the arrow is clicked, it will swap to the next/desired tab
    carouselArrowClick(rightArrow) {
        var newTabNum;
        if (rightArrow) {
            if (this.state.currentTab + 1 < 5) {
                newTabNum = this.state.currentTab + 1;
            } else {
                newTabNum = 0;
            }
        } else {
            if (currentTab - 1 < 0) {
                newTabNum = 4;
            } else {
                newTabNum = this.state.currentTab - 1;
            }
        }

        this.swapTab(newTabNum);
    }

    //Swaps to the desired tab specified in the parameter
    swapTab(tabNum) {

        stopCarousel(tabNum);

        if (tabNum != this.state.currentTab) {
            clearInterval(this.state.carouselInterval);


            //Sets the carousel landmark
            document.getElementById('carouselLandmark' + this.state.currentTab).dataset.active = "false";
            document.getElementById('carouselLandmark' + this.state.tabNum).dataset.active = "true";

            document.getElementById('carousel' + this.state.currentTab).dataset.active = "active";
            document.getElementById('carousel' + this.state.currentTab).style.zIndex = "150";
            document.getElementById('carousel' + this.state.tabNum).dataset.active = "ondeck";
            document.getElementById('carousel' + this.state.tabNum).style.zIndex = "149";


            var lastTab = this.state.currentTab;

            clearTimeout(this.state.carouselTimeout);

            this.setState({
                //Sets the new carousel timeout
                carouselTimeout: setTimeout(function () {
                    document.getElementById('carousel' + this.state.lastTab).dataset.active = "inactive";
                    document.getElementById('carousel' + this.state.lastTab).style.zIndex = "100";
                }, 3000),

                //Sets the tab number
                ondeckTab: tabNum + 1,
                currentTab: tabNum,
                nextTab: tabNum - 1
            )}


        }

        //Sets the current tab to 1 if it has reached the end of the rotation
        //The number being compared to should be: (number of slides - 1)
        //For four slides this number will be three
        if (currentTab > 4) {
            this.setState({
                currentTab: 0
            });
        }

        if (ondeckTab > 4) {
            this.setState({
                ondeckTab: 0
            });
        }

        if (nextTab > 4) {
            this.setState({
                nextTab = 0
            });
        }

        this.carouselSlide();

    }



    carouselSlide(carouselShouldSlide) {

        //Disallows the carousel from sliding automatically if not desired
        if (!carouselShouldSlide) {
            return;
        }

        this.setState({
            carouselInterval: setInterval(function() {

                document.getElementById('carousel' + this.state.currentTab).dataset.active = "active";
                document.getElementById('carousel' + this.state.ondeckTab).dataset.active = "ondeck";

                clearTimeout(carouselTimeout);

                this.setState({
                    carouselTimeout = setTimeout(function () {
                        document.getElementById('carousel' + this.state.nextTab).dataset.active = "inactive";
                    }, 3000),

                    //Increases the tab number
                    currentTab: this.state.currentTab + 1,
                    ondeckTab: this.state.ondeckTab + 1,
                    nextTab: this.state.nextTab + 1
                )};





                //Sets the current tab to 1 if it has reached the end of the rotation
                //The number being compared to should be: (number of slides - 1)
                //For four slides this number will be three
                if (this.state.currentTab > 4) {
                    this.setState({
                        currentTab = 0;
                    )};
                }

                if (this.state.ondeckTab > 4) {
                    this.setState({
                        ondeckTab = 0;
                    )};
                }

                if (this.state.nextTab > 4) {
                    this.setState({
                        nextTab = 0;
                    )};
                }


                //Sets the new carousel landmark
                if (this.state.nextTab != -1) {
                    document.getElementById('carouselLandmark' + this.state.nextTab).dataset.active = "false";
                }
                document.getElementById('carouselLandmark' + this.state.currentTab).dataset.active = "true";


            }, 6000)
        });

    }


    //Stops the carousel from moving
    stopCarousel(id) {

        id = id == undefined ? 0 : id;

        //Sets all of the carousel tabs to their default

        this.setState({
            ondeckTab: id + 1,
            currentTab: id,
            nextTab: id - 1
        });


        document.getElementById('carousel0').dataset.active = "active";
        document.getElementById('carouselLandmark0').dataset.active = "true";
        for (var i = 0; i < 5; i++) {
            if (id != i) {
                document.getElementById('carousel' + i).dataset.active = "inactive";
                document.getElementById('carouselLandmark' + i).dataset.active = "false";
            } else {
                document.getElementById('carousel' + i).dataset.active = "active";
                document.getElementById('carouselLandmark' + i).dataset.active = "true";
                document.getElementById('carouselContent' + i).style.opacity = "1";
            }
        }

        //Clears the intervals
        clearTimeout(this.state.carouselTimeout);
        clearInterval(this.state.carouselInterval);
    }



	render() {
        return (
			<div className="carouselContainer">
                <div className="carousel">



                    <div className="carouselTab carousel4" id="carousel4" data-active="inactive">
                        <div className="carouselOverlay"></div>
                        <div className="carouselContent" id="carouselContent4">
                            <h1>{this.props.header1}</h1>
                            <p>{this.props.text1}</p>
                            <Button click={this.props.clickButton1} type="iconButton">{this.props.buttonText1}</Button>
                        </div>
                    </div>


                    <div className="carouselLandmarkContainer">
                        <div className="landmarks">
                            <div className="carouselLandmark carouselLandmark0" id="carouselLandmark0" click={this.swapTab(0)} data-active="true"></div>
                            <div className="carouselLandmark carouselLandmark1" id="carouselLandmark1" click={this.swapTab(1)} data-active="false"></div>
                            <div className="carouselLandmark carouselLandmark2" id="carouselLandmark2" click={this.swapTab(2)} data-active="false"></div>
                            <div className="carouselLandmark carouselLandmark3" id="carouselLandmark3" click={this.swapTab(3)} data-active="false"></div>
                            <div className="carouselLandmark carouselLandmark4" id="carouselLandmark4" click={this.swapTab(4)} data-active="false"></div>
                        </div>
                    </div>


                </div>
            </div>
		);
	}
}



/*
<div className="carouselContainer">
    <div className="carousel">
        <div className="carouselTab carousel4" id="carousel4" data-active="inactive">
            <div className="carouselOverlay"></div>
            <div className="carouselContent" id="carouselContent4">
                <h1>HEADER</h1>
                <p>TEXT</p>
                <div className="homeButton" onclick="toggleAccountCreation();">
                    <div className="inner">
                        <span className="content">Get Started</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="carouselLandmarkContainer">
            <div className="landmarks">
                <div className="carouselLandmark carouselLandmark0" id="carouselLandmark0" onclick="swapTab(0)" data-active="true"></div>
                <div className="carouselLandmark carouselLandmark1" id="carouselLandmark1" onclick="swapTab(1)" data-active="false"></div>
                <div className="carouselLandmark carouselLandmark2" id="carouselLandmark2" onclick="swapTab(2)" data-active="false"></div>
                <div className="carouselLandmark carouselLandmark3" id="carouselLandmark3" onclick="swapTab(3)" data-active="false"></div>
                <div className="carouselLandmark carouselLandmark4" id="carouselLandmark4" onclick="swapTab(4)" data-active="false"></div>
            </div>
        </div>
    </div>
</div>
*/