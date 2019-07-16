import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Center from '@/layout/center'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/quality_manage',
    component: Layout,
    redirect: '/quality_manage/test_manage',
    name: 'quality_manage',
    meta: { title: '质量管理', icon: 'example' },
    children: [
      {
        path: 'test_manage',
        name: 'test_manage',
        component: () => import('@/views/table/index'),
        meta: { title: '测试管理', icon: 'table' }
      },
      {
        path: 'project_manage',
        redirect: '/quality_manage/project_manage/need_manage/xqtm_list',
        name: 'project_manage',
        component: Center,
        meta: { title: '项目管理', icon: 'table' },
        children: [
          {
            path: 'need_manage',
            redirect: '/quality_manage/project_manage/need_manage/xqtm_list',
            name: 'need_manage',
            component: Center,
            meta: { title: '需求管理', icon: 'example' },
            children: [
              {
                path: 'xqtm_list',
                name: 'xqtm_list',
                component: () => import('@/views/main/quality_manage/project_manage/need_manage/xqtm_list/xqtm_list'),
                meta: { title: '需求条目列表', icon: 'table' }
              },
              {
                path: 'redmine_work',
                name: 'redmine_work',
                component: () => import('@/views/main/quality_manage/project_manage/need_manage/redmine_work/redmine_work'),
                meta: { title: '报工量汇总情况', icon: 'table' }
              },
              {
                path: 'cq_release',
                name: 'cq_release',
                component: () => import('@/views/main/quality_manage/project_manage/need_manage/cq_release/cq_release'),
                meta: { title: '缺陷Reopen统计报表', icon: 'table' }
              },
              {
                path: 'cq_release_all',
                name: 'cq_release_all',
                component: () => import('@/views/main/quality_manage/project_manage/need_manage/cq_release_all/cq_release_all'),
                meta: { title: '缺陷Release统计报表', icon: 'table' }
              },
              {
                path: 'edit_group_project',
                name: 'edit_group_project',
                component: () => import('@/views/main/quality_manage/project_manage/need_manage/edit_group_project/edit_group_project'),
                meta: { title: '编辑或新增组-系统间权限', icon: 'table' }
              },
              {
                path: 'manage_year',
                name: 'manage_year',
                component: () => import('@/views/main/quality_manage/project_manage/need_manage/manage_year/manage_year'),
                meta: { title: '测试管理汇总表', icon: 'table' }
              }
            ]
          },
          {
            path: 'weekly_info_manage',
            name: 'weekly_info_manage',
            component: () => import('@/views/main/quality_manage/project_manage/weekly_info_manage/weekly_info_manage'),
            meta: { title: '周报信息管理', icon: 'example' }
          },
          {
            path: 'project_process_quality',
            component: Center,
            redirect: '/quality_manage/project_manage/project_process_quality/analyze/QA_singleproj_DRE',
            name: 'project_process_quality',
            meta: { title: '项目过程质量', icon: 'example' },
            children: [
              {
                path: 'analyze',
                component: Center,
                name: 'analyze',
                meta: { title: '项目过程质量分析', icon: 'table' },
                redirect: '/quality_manage/project_manage/project_process_quality/analyze/QA_singleproj_DRE',
                children: [
                  {
                    path: 'QA_singleproj_DRE',
                    component: () => import('@/views/main/quality_manage/project_manage/project_process_quality/analyze/QA_singleproj_DRE/QA_singleproj_DRE'),
                    name: 'QA_singleproj_DRE',
                    meta: { title: '单项目DRE', icon: 'nested' }
                  },
                  {
                    path: 'QA_singlesys_DRE',
                    component: () => import('@/views/main/quality_manage/project_manage/project_process_quality/analyze/QA_singlesys_DRE/QA_singlesys_DRE'),
                    name: 'QA_singlesys_DRE',
                    meta: { title: '单系统DRE', icon: 'nested' }
                  }
                ]
              },
              {
                path: 'check',
                component: Center,
                name: 'check',
                meta: { title: '项目过程质量检查', icon: 'table' },
                redirect: '/quality_manage/project_manage/project_process_quality/check/QA_table',
                children: [
                  {
                    path: 'QA_table',
                    component: () => import('@/views/main/quality_manage/project_manage/project_process_quality/check/QA_table/QA_table'),
                    name: 'QA_table',
                    meta: { title: '项目过程质量检查', icon: 'nested' }
                  },
                  {
                    path: 'QA_weekreport',
                    component: () => import('@/views/main/quality_manage/project_manage/project_process_quality/check/QA_weekreport/QA_weekreport'),
                    name: 'QA_weekreport',
                    meta: { title: '项目审计周报', icon: 'nested' }
                  },
                  {
                    path: 'plot_QA_weekreport',
                    component: () => import('@/views/nested/menu1/menu1-1'),
                    name: 'plot_QA_weekreport',
                    meta: { title: '项目审计周报（测试）', icon: 'nested' }
                  },
                  {
                    path: 'QA_auth',
                    component: () => import('@/views/nested/menu1/menu1-1'),
                    name: 'QA_auth',
                    meta: { title: '项目人员权限管理', icon: 'nested' }
                  },
                  {
                    path: 'Test_auth',
                    component: () => import('@/views/nested/menu1/menu1-1'),
                    name: 'Test_auth',
                    meta: { title: '过程审计员权限管理', icon: 'nested' }
                  },
                  {
                    path: 'Proj_all',
                    component: () => import('@/views/main/quality_manage/project_manage/project_process_quality/check/Proj_all/Proj_all'),
                    name: 'Proj_all',
                    meta: { title: '项目基础信息', icon: 'nested' }
                  },
                  {
                    path: 'Sys_all',
                    component: () => import('@/views/main/quality_manage/project_manage/project_process_quality/check/Sys_all/Sys_all'),
                    name: 'Sys_all',
                    meta: { title: '系统基础信息', icon: 'nested' }
                  }
                ]
              }
            ]
          },
          {
            path: 'Smartbi_report_info',
            component: Center,
            redirect: '/Smartbi_report_info/testreport_sys',
            name: 'Smartbi_report_info',
            meta: { title: 'Smartbi报表信息', icon: 'example' },
            children: [
              {
                path: 'testreport_sys',
                name: 'testreport_sys',
                component: () => import('@/views/table/index'),
                meta: { title: '第三方测试报告' }
              },
              {
                path: 'testreport',
                name: 'testreport',
                component: () => import('@/views/table/index'),
                meta: { title: '验收/模拟测试报告' }
              },
              {
                path: 'testdayreport_all',
                name: 'testdayreport_all',
                component: () => import('@/views/table/index'),
                meta: { title: '测试日报(52\\56\\206库测试版)' }
              },
              {
                path: 'testdayreport_zhichi',
                name: 'testdayreport_zhichi',
                component: () => import('@/views/table/index'),
                meta: { title: '支持组测试周报' }
              },
              {
                path: 'cqlist1',
                name: 'cqlist1',
                component: () => import('@/views/main/quality_manage/project_manage/Smartbi_report_info/cqlist1/cqlist1'),
                meta: { title: '缺陷详情查看(52\\56\\206库)_新' }
              },
              {
                path: 'bpminformation1',
                name: 'bpminformation1',
                component: () => import('@/views/table/index'),
                meta: { title: 'BPM立项工作量占比情况_新' }
              },
              {
                path: 'testlc1',
                name: 'testlc1',
                component: () => import('@/views/table/index'),
                meta: { title: '测试轮次准入准出详情(系统\\验收\\模拟)_新' }
              },
              {
                path: 'testlc_YXPT',
                name: 'testlc_YXPT',
                component: () => import('@/views/table/index'),
                meta: { title: '精益系统测试轮次准入准出详情' }
              },
              {
                path: 'PMO_in_out',
                name: 'PMO_in_out',
                component: () => import('@/views/table/index'),
                meta: { title: '系统测试准入准出详情' }
              }
            ]
          },
          {
            path: 'version_plan_manage',
            component: Layout,
            redirect: '/version_plan_manage/version_plan',
            name: 'version_plan_manage',
            meta: { title: '版本计划', icon: 'example' },
            children: [
              {
                path: 'version_plan',
                name: 'version_plan',
                component: () => import('@/views/table/index'),
                meta: { title: '版本计划查看', icon: 'table' }
              },
              {
                path: 'version_plan_add',
                name: 'version_plan_add',
                component: () => import('@/views/table/index'),
                meta: { title: '新增版本计划', icon: 'table' }
              },
              {
                path: 'version_risk',
                name: 'version_risk',
                component: () => import('@/views/table/index'),
                meta: { title: '版本风险', icon: 'table' }
              }
            ]
          },
          {
            path: 'workload_calendar_manage',
            component: Layout,
            redirect: '/workload_calendar_manage/workload_calendar',
            name: 'workload_calendar_manage',
            meta: { title: '工作日历', icon: 'example' },
            children: [
              {
                path: 'workload_calendar',
                name: 'workload_calendar',
                component: () => import('@/views/table/index'),
                meta: { title: '工作日历', icon: 'table' }
              },
              {
                path: 'my_staff',
                name: 'my_staff',
                component: () => import('@/views/table/index'),
                meta: { title: '负责人员情况', icon: 'table' }
              }
            ]
          },
          {
            path: 'version_staff_manage',
            component: Layout,
            redirect: '/version_staff_manage/staff_manage',
            name: 'version_staff_manage',
            meta: { title: '版本人员管理', icon: 'example' },
            children: [
              {
                path: 'staff_manage',
                name: 'staff_manage',
                component: () => import('@/views/table/index'),
                meta: { title: '人员分配', icon: 'table' }
              }
            ]
          },
          {
            path: 'board_manage',
            component: Center,
            redirect: '/quality_manage/project_manage/board_manage/message_list',
            name: 'board_manage',
            meta: { title: '看板管理', icon: 'example' },
            children: [
              {
                path: 'message_list',
                name: 'message_list',
                component: () => import('@/views/main/quality_manage/project_manage/board_manage/message_list/message_list'),
                meta: { title: '消息查看', icon: 'table' }
              },
              {
                path: 'download_manage',
                name: 'download_manage',
                component: () => import('@/views/main/quality_manage/project_manage/board_manage/download_manage/download_manage'),
                meta: { title: '下载管理', icon: 'table' }
              }
            ]
          },
          {
            path: 'setting_manage',
            component: Layout,
            redirect: '/setting_manage/group_user',
            name: 'setting_manage',
            meta: { title: '设置', icon: 'example' },
            children: [
              {
                path: 'group_user',
                name: 'group_user',
                component: () => import('@/views/table/index'),
                meta: { title: '组人员管理', icon: 'table' }
              },
              {
                path: 'group_sys',
                name: 'group_sys',
                component: () => import('@/views/table/index'),
                meta: { title: '组关联系统管理', icon: 'table' }
              },
              {
                path: 'user_auth',
                name: 'user_auth',
                component: () => import('@/views/table/index'),
                meta: { title: '人员权限管理', icon: 'table' }
              },
              {
                path: 'set_staff_leader',
                name: 'set_staff_leader',
                component: () => import('@/views/table/index'),
                meta: { title: '负责人设置', icon: 'table' }
              },
              {
                path: 'email_change',
                name: 'email_change',
                component: () => import('@/views/table/index'),
                meta: { title: '个人信息管理', icon: 'table' }
              },
              {
                path: 'group_send_email',
                name: 'group_send_email',
                component: () => import('@/views/table/index'),
                meta: { title: '邮件发送功能', icon: 'table' }
              }
            ]
          },
          {
            path: 'defect_requir_manage',
            component: Layout,
            redirect: '/defect_requir_manage/defect_manages',
            name: 'defect_requir_manage',
            meta: { title: '缺陷与需求', icon: 'example' },
            children: [
              {
                path: 'defect_manages',
                name: 'defect_manages',
                component: () => import('@/views/table/index'),
                meta: { title: '缺陷管理', icon: 'table' }
              },
              {
                path: 'requir_manages',
                name: 'requir_manages',
                component: () => import('@/views/table/index'),
                meta: { title: '需求管理', icon: 'table' }
              }
            ]
          },
          {
            path: 'bata_entrance_manage',
            component: Layout,
            redirect: '/bata_entrance_manage/clms_project',
            name: 'bata_entrance_manage',
            meta: { title: '报工公测入口', icon: 'example' },
            children: [
              {
                path: 'clms_project',
                name: 'clms_project',
                component: () => import('@/views/table/index'),
                meta: { title: '精益系统项目情况', icon: 'table' }
              }
            ]
          }
        ]
      },
      {
        path: 'statistic_analyze',
        name: 'statistic_analyze',
        component: () => import('@/views/table/index'),
        meta: { title: '统计分析', icon: 'table' }
      }
    ]
  },

  {
    path: '/permission_manage',
    component: Layout,
    redirect: '/permission_manage/permission',
    name: 'permission_manage',
    children: [{
      path: 'permission',
      name: 'permission',
      component: () => import('@/views/main/permission_manage/permission_manage'),
      meta: { title: '权限管理', icon: 'example' }
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       redirect: '/nested/menu1/menu1-1',
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           redirect: '/nested/menu1/menu1-2/menu1-2-1',
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
