export function createComponentInstance(vnode) {
  const componet = {
    vnode,
    type: vnode.type,
  }
}
export function setupComponent(instance) {
  //TODO
  //initProps()
  //initSlots()
  setupStatefulComponent(instance)
}
function setupStatefulComponent(instance: any) {
  const Component = instance.vnode.type
  const { setup } = Component
  if (setup) {
    const setupResult = setup()
    handleSetupResualt(instance, setupResult)
  }
}
function handleSetupResualt(instance, setupResult: any) {
  //function Object
  //TODO function
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}
function finishComponentSetup(instance: any) {
  const Component = instance.type
  if (!Component.render) {
    instance.render = Component.render
  }
}
