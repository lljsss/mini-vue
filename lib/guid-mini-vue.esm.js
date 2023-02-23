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
    const { shapeFlag } = vnode;
    if (shapeFlag & 1 /* ShapeFlages.ELEMENT */) {
        // 生成元素
        processElement(vnode, container);
    }
    else if (shapeFlag & 2 /* ShapeFlages.STATEFUAL_COMPONENT */) {
        // 去处理组件
        processComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    const el = (vnode.el = document.createElement(vnode.type));
    const { childern, shapeFlag } = vnode;
    if (shapeFlag & 4 /* ShapeFlages.TEXT_CHILDREN */) {
        // text_children
        el.textContent = childern;
    }
    else if (shapeFlag & 8 /* ShapeFlages.ARRAY_CHILDREN */) {
        // array-children
        mountChildren(vnode, el);
    }
    const { props } = vnode;
    for (const key in props) {
        const val = props[key];
        const isOn = (key) => /^on[A-Z]/.test(key);
        if (isOn(key)) {
            const event = key.slice(2).toLocaleLowerCase();
            el.addEventListener(event, val);
        }
        else {
            el.setAttribute(key, val);
        }
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
        shapeFlag: getShapeFlag(type),
        childern,
        el: null,
    };
    // children
    if (typeof childern === 'string') {
        vnode.shapeFlag |= 4 /* ShapeFlages.TEXT_CHILDREN */;
    }
    else if (Array.isArray(childern)) {
        vnode.shapeFlag |= 8 /* ShapeFlages.ARRAY_CHILDREN */;
    }
    return vnode;
}
function getShapeFlag(type) {
    return typeof type === 'string'
        ? 1 /* ShapeFlages.ELEMENT */
        : 2 /* ShapeFlages.STATEFUAL_COMPONENT */;
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
