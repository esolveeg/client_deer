export const form = {
    BuildingNo : "",
    RowNo : "",
    FlatNo : "",
    Street : "",
    Remark : "",
    Main : "",
    AreaNo : "",
    Main : 0,
    PhSerial : ""
}


export const rules = {
    BuildingNo : [
        v => !!v || 'required',
    ],
    RowNo : [
        v => !!v || 'required',
    ],
    FlatNo : [
        v => !!v || 'required',
    ],
    Street : [
        v => !!v || 'required',
    ],
    Remark : [],
    Main : [],
    AreaNo : [
        v => !!v || 'required',
    ],
    PhSerial : [
        v => !!v || 'required',
    ]
}

export const errors = {
    BuildingNo : [],
    RowNo : [],
    FlatNo : [],
    Street : [],
    Remark : [],
    Main :[],
    AreaNo :[],
    PhSerial: []
}