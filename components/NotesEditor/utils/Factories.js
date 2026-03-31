import AlertBlock from "../templates/AlertBlock"
import DangerAlertBlock from "../templates/DangerAlertBlock"
import CreateReactBlock from "./CreateReactBlock"

const Factory = {
   alert: {
      title: "Custom Alert",
      group: "New Style",
      spec: CreateReactBlock(
         "alert",
         { title: "Alert Title", message: "Type your warning message here..." },
         AlertBlock
      ),
   },
   danger: {
      title: "Danger Alert",
      group: "This is group",
      spec: CreateReactBlock(
         "danger",
         { title: "Danger Title", message: "Type your danger message here..." },
         DangerAlertBlock
         // DangerComponent
      ),
   },
}

export default Factory