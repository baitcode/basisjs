## 1.2.0 → 1.2.1

Remove
 
  - `basis.xml.createAttributeNS` (as candidate to remove in DOM level 4)
  - `basis.xml.setAttributeNodeNS` (as candidate to remove in DOM level 4)

## 1.1.0 → 1.2.0

Rename

  - `basis.net.Transport` → `basis.net.ajax.Transport`
  - `basis.net.Request` → `basis.net.ajax.Request`
  - `basis.net.request` → `basis.net.ajax.request`
  - `basis.layout.VerticalPanel` → `basis.ui.panel.VerticalPanel`
  - `basis.layout.VerticalPanelStack` → `basis.ui.panel.VerticalPanelStack`
  - `processErrorResponse` → `getResponseError` in all `basis.net` related modules

Remove
  
  - `basis.date.toFormat`
  - `basis.layout.Box`
  - `basis.layout.Viewport`
  - `basis.layout.addBlockResizeHandler`
  - `basis.data.Object#isTarget`
  - `basis.entity.Type#addField` (doesn't work since 1.0 anyway)
  - `basis.entity.Type#addCalcField` (doesn't work since 1.0 anyway)

Might broke

  - `extProto: false` by default (don't extend buildin classes prototypes)
  - all resource extensions are updatable by default (use `permanent: true` in resource type definition to supress it)
  - all relative paths should start with `./` or `..`
  - `basis.dragdrop.DragDropElement#isDragging` method returns `false` inside `over` event handlers (returns `true` before)
  - `.l10n` resources return dictionary instead of `json` object
  - `resposeText`, `responseXML` and `error` don't store in `basis.net.*.Request#data`
  - `typeof` check in `basis.data.Value.from` was removed (returns `null` before, if first argument isn't an `object`)
