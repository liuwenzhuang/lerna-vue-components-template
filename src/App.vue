<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import components from './components/'
import { Layout, Menu, Icon } from 'ant-design-vue'
import { CreateElement } from 'vue'

@Component({
  components: {
    'a-layout': Layout,
    'a-layout-content': Layout.Content,
    'a-layout-sider': Layout.Sider,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-icon': Icon,
  },
})
export default class App extends Vue {
  selectComponent = 'product-navigation'

  onSelectComponent(item: any) {
    this.$router.push({
      path: `/${item.key}`,
    })
  }

  render(h: CreateElement) {
    return (
      <a-layout id="app">
        <a-layout-sider
          theme="light"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <a-menu
            mode="inline"
            default-selected-keys={['product-navigation']}
            onClick={this.onSelectComponent}
          >
            {components.map((component) => (
              <a-menu-item key={component.key}>
                <span>{component.title}</span>
              </a-menu-item>
            ))}
          </a-menu>
        </a-layout-sider>
        <a-layout style={{ marginLeft: '200px' }}>
          <a-layout-content style={{ margin: '24px 16px', overflow: 'auto' }}>
            <div
              style={{
                padding: '24px',
                background: '#fff',
                textAlign: 'center',
              }}
            >
              <router-view />
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    )
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}
</style>
