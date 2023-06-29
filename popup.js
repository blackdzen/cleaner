const clearBtn = document.getElementById("clear");

clearBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id, allFrames: true },
      func: clearIncidents,
    });
  });
});

function clearIncidents() {
  const incidentList = document.querySelector(
    "#group_interaction_info_form-tab_view-unloose_incident_table_data"
  );
  const deleteBtnID = incidentList.firstChild.querySelector("button").id;
  const pagination = document.querySelector(
    "#group_interaction_info_form-tab_view-unloose_incident_table_paginator_bottom"
  );
  let paginationPages = pagination
    .querySelector(".ui-paginator-current")
    .textContent.split(" ");
  paginationPages = parseInt(paginationPages[paginationPages.length - 1], 10);
  const paginationRows = pagination.getElementsByTagName("select")[0].value;
  const incidentCount = paginationPages * paginationRows;
  for (let i = 1; i <= incidentCount; i++) {
    document.getElementById(deleteBtnID).click();
  }
}
