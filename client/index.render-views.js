import $ from "jquery";

import ChartComponents from "./chart.component";
import TrackerComponents from "./tracker.component";
import UserComponents from "./user.component";

import { STATE } from "./index";

import mockTrackerData from "./mock-data";
import { debug } from "util"; //?
import Cookies from "js-cookie";

// render login page -- is this needed? 
export function renderIndexPage() {
  $(".main-section").hide();
  $(".index").show(); 
}

// render login form
export function renderLoginForm() {
  $(".main-section").hide();
  $(".login").show();
}

// render login form
export function renderSignUpForm() {
  $(".main-section").hide();
  $(".sign-up").show();
}

// render dashboard
export function renderDashboard() {
  $(".main-section").hide();
  $(".dashboard-container").empty(); //html('');
  // $(".tracker-container").empty(); //try to fix duplicate render

  STATE.trackers.forEach(trackerData => {
    const component = new TrackerComponents(trackerData);
    $(".dashboard-container").append(component.getDashboardTrackerHtml());
  });

  $(".dashboard").show();
}

// render chart function
function renderChartComponent(data) {
  const chartComponent = new ChartComponents(data);
  chartComponent.renderChart();
}

//render summary page
export function renderSummaryPage() {
  $(".main-section").hide();
  $(".summary-container").empty();

  STATE.trackers.forEach(trackerData => {
    const trackerComponent = new TrackerComponents(trackerData);
    $(".summary-container").append(trackerComponent.getTrackerSummaryHtml());

    renderChartComponent(trackerData);
  });

  $(".tracker-summary").show();
}

//render individual tracker summary
export function renderIndividualTrackerSummary(id) {
  $(".main-section").hide();
  $(".summary-container").empty();

  let trackerData = STATE.trackers.find(tracker => tracker.id === id);
  const trackerComponent = new TrackerComponents(trackerData);

  $(".summary-container").append(trackerComponent.getIndividualTrackerHtml());
  renderChartComponent(trackerData);

  $(".tracker-summary").show();
}

//render archive page -- change state to include archive?
export function renderArchivePage() {
  $(".main-section").hide();
  $(".archive-container").empty();

  STATE.archivedTrackers.forEach(trackerData => {
    const trackerComponent = new TrackerComponents(trackerData);
    $(".archive-container").append(trackerComponent.getArchiveTrackerHtml());
    renderChartComponent(trackerData);
  });
  // console.log(STATE.archivedTrackers);
  $(".tracker-archive").show();
}

//render create new tracker
export function renderCreateTrackerPage() {
  $(".main-section").hide();
  $(".create-container").empty(); 

  $(".create-container").append(TrackerComponents.getCreateTrackerHtml());
  $(".create-tracker").show();
}

//logout
export function logOutOfDashboard() {
  Cookies.remove("jwt");
  Cookies.remove("loggedInUserId");
  // delete keyword - use to delete property from obj
  delete STATE.jwt; 
  delete STATE.currentUserId;
  
  //redirect to login page (root) 
  window.location = '/'; 
}

//render user profile page - remove for now
// export function renderProfilePage() {
//   $(".main-section").hide();

//   const userComponent = new UserComponents(userData);
//   $(".profile-container").append(userComponent.getProfileHtml());

//   $(".profile").show();
// }

// function toggleChartType() {

//   let trackerData = STATE.trackers.find(tracker => tracker.id === id);
//   const trackerComponent = new TrackerComponents(trackerData);
//   $(".summary-container").append(trackerComponent.getTrackerSummaryHtml());

//   const chartComponent = new ChartComponents(trackerData);
//   chartComponent.renderChart();
// }
