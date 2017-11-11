import $ from "jquery";

import ChartComponents from "./chart.component";
import TrackerComponents from "./tracker.component";
import UserComponents from "./user.component";

import { STATE } from "./index";

import mockTrackerData from "./mock-data";
import { debug } from "util"; //?


// render different views
// render login screen

// render dashboard
export function renderDashboard() {
  $(".main-section").hide();
  $(".dashboard-container").empty(); //html('');
  // $('.tracker-container').empty();
  STATE.trackers.forEach(trackerData => {
    const component = new TrackerComponents(trackerData);
    $(".dashboard-container").append(component.getDashboardTrackerHtml());
  });

  $(".dashboard").show();
}

//render create new tracker
export function renderCreateTracker() {
  //need to empty everything displayed
  $(".main-section").hide(); 
  $(".create-tracker").show();
}

//render summary page
export function renderSummaryPage() {
  $(".main-section").hide();
  $(".summary-container").empty();

  STATE.trackers.forEach(trackerData => {
    const trackerComponent = new TrackerComponents(trackerData);
    $(".summary-container").append(trackerComponent.getTrackerSummaryHtml());
    
    const chartComponent = new ChartComponents(trackerData);
    chartComponent.renderChart();
  });

  $(".tracker-summary").show();
}

// function toggleChartType() {

//   let trackerData = STATE.trackers.find(tracker => tracker.id === id);
//   const trackerComponent = new TrackerComponents(trackerData);
//   $(".summary-container").append(trackerComponent.getTrackerSummaryHtml());

//   const chartComponent = new ChartComponents(trackerData);
//   chartComponent.renderChart();
// }  

//render individual tracker summary
export function renderIndividualTrackerSummary(id) {
  $(".main-section").hide();
  $(".summary-container").empty();

  let trackerData = STATE.trackers.find(tracker => tracker.id === id);
  const trackerComponent = new TrackerComponents(trackerData);
  $(".summary-container").append(trackerComponent.getIndividualTrackerHtml());

  const chartComponent = new ChartComponents(trackerData);
  chartComponent.renderChart();

  $(".tracker-summary").show();
}

//render archive page -- change state to include archive?
export function renderArchivePage() {
  $(".main-section").hide();
  $(".archive-container").empty();

  STATE.archivedTrackers.forEach(trackerData => {
    const trackerComponent = new TrackerComponents(trackerData);
    $(".archive-container").append(trackerComponent.getArchiveTrackerHtml());

    const chartComponent = new ChartComponents(trackerData);
    chartComponent.renderChart();
  });
  // console.log(STATE.archivedTrackers);
  $(".tracker-archive").show();
}

//render user profile page - ??
export function renderProfilePage() {
  $(".main-section").hide();

  const userComponent = new UserComponents(userData);
  $(".profile-container").append(userComponent.getProfileHtml());

  $(".profile").show();
}

//render description in input
// function renderDescription() {
//   ${this.description}
// }

//render log out
export function renderLogOutDashboard() {
  //return to landing-page
}