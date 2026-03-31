import { createReactBlockSpec } from "@blocknote/react";

/**
 * createBlockSpec(type, defaultProps, Component)
 *
 * @param {string} type         - Unique block type name e.g. "alert"
 * @param {object} defaultProps - Key/value pairs of prop names and their defaults
 *                                e.g. { title: "My Title", message: "My message" }
 * @param {React.FC} Component  - React component that receives { block, editor }
 *                                Access props via block.props.title, block.props.message etc.
 * @returns A callable block spec factory — call the result with () when adding to schema
 */
const CreateReactBlock = (type, defaultProps, Component) => {
   const propSchema = Object.fromEntries(
      Object.entries(defaultProps).map(([key, value]) => [key, { default: value }])
   );

   return createReactBlockSpec(
      {
         type,
         propSchema,
         content: "none",
      },
      {
         render: (props) => <Component {...props} />,
      }
   );
};

export default CreateReactBlock;