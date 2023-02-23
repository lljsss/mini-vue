const isObject = function (obj) {
    return obj !== null && typeof obj === 'object';
};

const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        const { setupState } = instance;
        if (key in setupState) {
            return setupState[key];
        }
        const publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    },
};

function createComponentInstance(vnode) {
    const componet = {
        vnode,
        type: vnode.type,
        setupState: {},
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
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
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
    patch(vnode, container);
}
function patch(vnode, container) {
    // 判断vnode 是不是一个element
    //是 element 那么就应该处理element
    // 去处理组件
    // 判断是不是element
    if (typeof vnode.type === 'string') {
        processElement(vnode, container);
    }
    else if (isObject(vnode.type)) {
        processComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    const el = (vnode.el = document.createElement(vnode.type));
    const { childern } = vnode;
    if (typeof childern === 'string') {
        el.textContent = childern;
    }
    else if (Array.isArray(childern)) {
        mountChildren(vnode, el);
    }
    const { props } = vnode;
    for (const key in props) {
        const val = props[key];
        el.setAttribute(key, val);
    }
    container.appendChild(el);
}
function mountChildren(vnode, el) {
    vnode.childern.forEach((v) => {
        patch(v, el);
    });
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(initinalVnode, container) {
    const instance = createComponentInstance(initinalVnode);
    setupComponent(instance);
    setupRenderEffect(instance, initinalVnode, container);
}
function setupRenderEffect(instance, initinalVnode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    // vnode-> patch
    // vnode-> element ->mountElement
    patch(subTree, container);
    initinalVnode.el = subTree.el;
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
            render(vnode, rootContainer);
        },
    };
}

function h(type, props, childern) {
    return createVNode(type, props, childern);
}

export { createApp, h };
