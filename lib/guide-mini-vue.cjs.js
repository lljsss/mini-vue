'use strict';

const isObject = function (obj) {
    return obj !== null && typeof obj === 'object';
};

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
    const el = document.createElement(vnode.type);
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
function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    // vnode-> patch
    // vnode-> element ->mountElement
    patch(subTree, container);
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

exports.createApp = createApp;
exports.h = h;
