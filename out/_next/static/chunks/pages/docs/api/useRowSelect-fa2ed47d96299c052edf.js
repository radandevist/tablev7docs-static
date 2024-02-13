_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[20],{"2P23":function(e,t,a){"use strict";a.r(t),a.d(t,"meta",(function(){return r})),a.d(t,"default",(function(){return m}));var l=a("HALo"),n=a("dhJC"),i=a("q1tI"),b=a.n(i),o=a("7ljp"),c=a("er9C"),r=(b.a.createElement,{}),p={meta:r},s=function(e){var t=e.children,a=Object(n.a)(e,["children"]);return Object(o.b)(c.a,Object(l.a)({meta:r},a),t)};function m(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(o.b)(s,Object(l.a)({},p,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"userowselect"},Object(o.b)("inlineCode",{parentName:"h1"},"useRowSelect"),Object(o.b)("a",Object(l.a)({parentName:"h1"},{href:"#userowselect",title:"Direct link to heading",className:"anchor"}),Object(o.b)("span",Object(l.a)({parentName:"a"},{className:"icon icon-link"})))),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Plugin Hook"),Object(o.b)("li",{parentName:"ul"},"Optional")),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"useRowSelect")," is the hook that implements ",Object(o.b)("strong",{parentName:"p"},"basic row selection"),". For more information on row selection, see Row Selection"),Object(o.b)("h3",{id:"table-options"},"Table Options",Object(o.b)("a",Object(l.a)({parentName:"h3"},{href:"#table-options",title:"Direct link to heading",className:"anchor"}),Object(o.b)("span",Object(l.a)({parentName:"a"},{className:"icon icon-link"})))),Object(o.b)("p",null,"The following options are supported via the main options object passed to ",Object(o.b)("inlineCode",{parentName:"p"},"useTable(options)")),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"initialState.selectedRowIds: Object<rowId: Boolean>"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Optional"),Object(o.b)("li",{parentName:"ul"},"Defaults to ",Object(o.b)("inlineCode",{parentName:"li"},"{}")),Object(o.b)("li",{parentName:"ul"},"If a row's ID is set to ",Object(o.b)("inlineCode",{parentName:"li"},"true")," in this object, it will have a selected state."))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"manualRowSelectedKey: String"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Optional"),Object(o.b)("li",{parentName:"ul"},"Defaults to ",Object(o.b)("inlineCode",{parentName:"li"},"isSelected")),Object(o.b)("li",{parentName:"ul"},"If this key is found on the ",Object(o.b)("strong",{parentName:"li"},"original")," data row, and it is true, this row will be manually selected"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"autoResetSelectedRows: Boolean"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Defaults to ",Object(o.b)("inlineCode",{parentName:"li"},"true")),Object(o.b)("li",{parentName:"ul"},"When ",Object(o.b)("inlineCode",{parentName:"li"},"true"),", the ",Object(o.b)("inlineCode",{parentName:"li"},"selectedRowIds")," state will automatically reset if any of the following conditions are met:",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"data")," is changed"))),Object(o.b)("li",{parentName:"ul"},"To disable, set to ",Object(o.b)("inlineCode",{parentName:"li"},"false")),Object(o.b)("li",{parentName:"ul"},"For more information see the FAQ ",Object(o.b)("a",Object(l.a)({parentName:"li"},{href:"../faq#how-do-i-stop-my-table-state-from-automatically-resetting-when-my-data-changes"}),'"How do I stop my table state from automatically resetting when my data changes?"'))))),Object(o.b)("h3",{id:"instance-properties"},"Instance Properties",Object(o.b)("a",Object(l.a)({parentName:"h3"},{href:"#instance-properties",title:"Direct link to heading",className:"anchor"}),Object(o.b)("span",Object(l.a)({parentName:"a"},{className:"icon icon-link"})))),Object(o.b)("p",null,"The following values are provided to the table ",Object(o.b)("inlineCode",{parentName:"p"},"instance"),":"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"toggleRowSelected: Function(rowPath: String, ?set: Bool) => void"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Use this function to toggle a row's selected state."),Object(o.b)("li",{parentName:"ul"},"Optionally pass ",Object(o.b)("inlineCode",{parentName:"li"},"true")," or ",Object(o.b)("inlineCode",{parentName:"li"},"false")," to set it to that state"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"toggleAllRowsSelected: Function(?set: Bool) => void"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Use this function to toggle all rows as selected or not"),Object(o.b)("li",{parentName:"ul"},"Optionally pass ",Object(o.b)("inlineCode",{parentName:"li"},"true")," or ",Object(o.b)("inlineCode",{parentName:"li"},"false")," to set all rows to that state"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"toggleAllPageRowsSelected: Function(?set: Bool) => void"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Use this function to toggle all of the current page's rows as selected or not"),Object(o.b)("li",{parentName:"ul"},"Optionally pass ",Object(o.b)("inlineCode",{parentName:"li"},"true")," or ",Object(o.b)("inlineCode",{parentName:"li"},"false")," to set all rows to that state"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"getToggleAllPageRowsSelectedProps: Function(props) => props"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Use this function to get the props needed for a ",Object(o.b)("strong",{parentName:"li"},"select all checkbox (current page only)"),"."),Object(o.b)("li",{parentName:"ul"},"Props:",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"onChange: Function()")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"style.cursor: 'pointer'")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"checked: Bool")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"indeterminate: Bool")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"title: 'Toggle All Rows Selected'")))))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"getToggleAllRowsSelectedProps: Function(props) => props"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Use this function to get the props needed for a ",Object(o.b)("strong",{parentName:"li"},"select all checkbox"),"."),Object(o.b)("li",{parentName:"ul"},"Props:",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"onChange: Function()")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"style.cursor: 'pointer'")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"checked: Bool")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"indeterminate: Bool")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"title: 'Toggle All Rows Selected'")))))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"isAllRowsSelected: Bool"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Will be ",Object(o.b)("inlineCode",{parentName:"li"},"true")," if all rows are selected."),Object(o.b)("li",{parentName:"ul"},"If at least one row is not selected, will be ",Object(o.b)("inlineCode",{parentName:"li"},"false")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"selectedFlatRows: Array<Row>"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"The flat array of rows that are currently selected")))),Object(o.b)("h3",{id:"row-properties"},"Row Properties",Object(o.b)("a",Object(l.a)({parentName:"h3"},{href:"#row-properties",title:"Direct link to heading",className:"anchor"}),Object(o.b)("span",Object(l.a)({parentName:"a"},{className:"icon icon-link"})))),Object(o.b)("p",null,"The following additional properties are available on every ",Object(o.b)("strong",{parentName:"p"},"prepared")," ",Object(o.b)("inlineCode",{parentName:"p"},"row")," object returned by the table instance."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"isSelected: Bool"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Will be ",Object(o.b)("inlineCode",{parentName:"li"},"true")," if the row is currently selected"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"isSomeSelected: Bool"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Will be ",Object(o.b)("inlineCode",{parentName:"li"},"true")," if the row has subRows and at least one of them is currently selected"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"toggleRowSelected: Function(?set)"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Use this function to toggle this row's selected state."),Object(o.b)("li",{parentName:"ul"},"Optionally pass ",Object(o.b)("inlineCode",{parentName:"li"},"true")," or ",Object(o.b)("inlineCode",{parentName:"li"},"false")," to set it to that state"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"getToggleRowSelectedProps: Function(props) => props"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Use this function to get the props needed for a ",Object(o.b)("strong",{parentName:"li"},"select row checkbox"),"."),Object(o.b)("li",{parentName:"ul"},"Props:",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"onChange: Function()")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"style.cursor: 'pointer'")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"checked: Bool")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"title: 'Toggle Row Selected'"))))))),Object(o.b)("h3",{id:"example"},"Example",Object(o.b)("a",Object(l.a)({parentName:"h3"},{href:"#example",title:"Direct link to heading",className:"anchor"}),Object(o.b)("span",Object(l.a)({parentName:"a"},{className:"icon icon-link"})))),Object(o.b)("h4",{id:"select-all-checks-all-rows"},"Select All Checks All Rows",Object(o.b)("a",Object(l.a)({parentName:"h4"},{href:"#select-all-checks-all-rows",title:"Direct link to heading",className:"anchor"}),Object(o.b)("span",Object(l.a)({parentName:"a"},{className:"icon icon-link"})))),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(l.a)({parentName:"li"},{href:"https://github.com/tannerlinsley/react-table/tree/v7/examples/row-selection"}),"Source")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(l.a)({parentName:"li"},{href:"https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/row-selection"}),"Open in CodeSandbox"))),Object(o.b)("h4",{id:"select-all-checks-current-pages-rows"},"Select All Checks Current Page's Rows",Object(o.b)("a",Object(l.a)({parentName:"h4"},{href:"#select-all-checks-current-pages-rows",title:"Direct link to heading",className:"anchor"}),Object(o.b)("span",Object(l.a)({parentName:"a"},{className:"icon icon-link"})))),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(l.a)({parentName:"li"},{href:"https://github.com/tannerlinsley/react-table/tree/v7/examples/row-selection-and-pagination"}),"Source")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(l.a)({parentName:"li"},{href:"https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/row-selection-and-pagination"}),"Open in CodeSandbox"))))}m.isMDXComponent=!0},JOpS:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/api/useRowSelect",function(){return a("2P23")}])}},[["JOpS",0,2,1,3,4]]]);