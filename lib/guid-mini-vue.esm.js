function createComponentInstance(vnode) {
    const componet = {
        vnode,
        type: vnode.type,
    };
    return componet;
}
function setupComponent(instance) {
    //TODO
    //initProps()
    //initSlots()
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const Component = instance.type;
    const { setup } = Component;
    if (setup) {
        const setupResult = setup();
        handleSetupResualt(instance, setupResult);
    }
}
function handleSetupResualt(instance, setupResult) {
    //function Object
    //TODO function
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    // if (Component.render) {
    instance.render = Component.render;
    // }
}

function render(vnode, container) {
    // patch
    patch(vnode);
}
function patch(vnode, container) {
    // 判断vnode 是不是一个element
    //是 element 那么就应该处理element
    // 去处理组件
    // 判断是不是element
    processComponent(vnode);
}
function processComponent(vnode, container) {
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    // vnode-> patch
    // vnode-> element ->mountElement
    patch(subTree);
}

function createVNode(type, props, childern) {
    const vnode = {
        type,
        props,
        childern,
    };
    return vnode;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // 先vonde
            // componet-> vnode
            // 所有的逻辑操作 都会基于vnode做处理
            const vnode = createVNode(rootComponent);
            render(vnode);
        },
    };
}

function h(type, props, childern) {
    return createVNode(type, props, childern);
}

export { createApp, h };
