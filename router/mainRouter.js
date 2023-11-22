export const mainRouter = [
    {
        path: 'note/list',
        name: 'note-list',
        component: () => import("@/pages/note/NoteList.vue"),
        meta:{
            auth:true,
        },
    },
    {
        path: 'linkcard/list',
        name: 'link-card-list',
        component: () => import("@/pages/linkcard/LinkCard.vue"),
        meta:{
            auth:true,
        },
    },
    {
        path: 'profile/list',
        name: 'profile-list',
        component: () => import("@/pages/profile/Profile.vue"),
        meta:{
            auth:true,
        },
    },
]