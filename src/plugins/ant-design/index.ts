import { App, Component } from "vue";
import {
  ListItemMeta,
  List,
  ListItem,
  Avatar,
  Card,
  CardMeta,
  Button,
  Descriptions,
  DescriptionsItem,
  Row,
  Col,
  Pagination,
  Spin
} from "ant-design-vue";

// Directives
const plugins = [];

const components = [
  ListItemMeta,
  List,
  ListItem,
  Avatar,
  Card,
  CardMeta,
  Button,
  Descriptions,
  DescriptionsItem,
  Row,
  Pagination,
  Spin,
  Col
];

export function useAntDesign(app: App) {
  // 注册组件
  components.forEach((component: Component) => {
    app.component(component.name, component);
  });
  // 注册指令
  plugins.forEach(plugin => {
    // @ts-ignore
    app.use(plugin);
  });
}
