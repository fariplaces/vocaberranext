// import ImportantBlock from "../templates/ImportantBlock"
// import DangerBlock from "../templates/DangerBlock"
// import CreateReactBlock from "./CreateReactBlock"
// import CriticalBlock from "../templates/CriticalBlock"
// import AlertBlock from "../templates/AlertBlock"
// import SwareBlock from "../templates/SwareBlock"

// const Factory = {
//    alert: {
//       title: "Alert",
//       group: "New Style",
//       spec: CreateReactBlock(
//          "alert",
//          { title: "Important Thing To Notice", message: "Type your warning message here..." },
//          AlertBlock
//       ),
//    },
//    info: {
//       title: "Sware",
//       group: "New Style",
//       spec: CreateReactBlock(
//          "alert",
//          { title: "Important Thing To Notice", message: "Type your warning message here..." },
//          SwareBlock
//       ),
//    },
//    danger: {
//       title: "Danger Alert",
//       group: "This is group",
//       spec: CreateReactBlock(
//          "danger",
//          { title: "SomeTime Cause Issues Due to This Title", message: "Type your danger message here..." },
//          DangerBlock
//          // DangerComponent
//       ),
//    },
//    important: {
//       title: "Danger Alert",
//       group: "This is group",
//       spec: CreateReactBlock(
//          "important",
//          { title: "SomeTime Cause Issues Due to This Title", message: "Type your danger message here..." },
//          ImportantBlock
//          // DangerComponent
//       ),
//    },
//    critical: {
//       title: "Danger Alert",
//       group: "This is group",
//       spec: CreateReactBlock(
//          "critical",
//          { title: "SomeTime Cause Issues Due to This Title", message: "Type your danger message here..." },
//          CriticalBlock
//          // DangerComponent
//       ),
//    },
// }

// export default Factory


import ImportantBlock from "../templates/ImportantBlock"
import DangerBlock from "../templates/DangerBlock"
import CreateReactBlock from "./CreateReactBlock"
import CriticalBlock from "../templates/CriticalBlock"
import AlertBlock from "../templates/AlertBlock"
import SwareBlock from "../templates/SwareBlock"

const Factory = {
   alert: {
      title: "Alert",
      group: "New Style",
      spec: CreateReactBlock(
         "alert",
         { title: "Alert: Some Thing To Notice", message: "Type your warning message here..." },
         AlertBlock
      ),
   },
   danger: {
      title: "Danger Alert",
      group: "This is group",
      spec: CreateReactBlock(
         "danger",
         { title: "SomeTime Cause Issues Due to This Title", message: "Type your danger message here..." },
         DangerBlock
      ),
   },
   important: {
      title: "Important",
      group: "This is group",
      spec: CreateReactBlock(
         "important",
         { title: "SomeTime Cause Issues Due to This Title", message: "Type your danger message here..." },
         ImportantBlock
      ),
   },
   critical: {
      title: "Critical",
      group: "This is group",
      spec: CreateReactBlock(
         "critical",
         { title: "SomeTime Cause Issues Due to This Title", message: "Type your danger message here..." },
         CriticalBlock
      ),
   },
   sware: {
      title: "Sware",
      group: "New Style",
      spec: CreateReactBlock(
         "sware", // was "alert" — bug fixed
         { title: "Sware: Thing To Notice", message: "Type your warning message here..." },
         SwareBlock
      ),
   },
}

export default Factory