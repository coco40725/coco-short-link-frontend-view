import {describe, it, vi, expect, afterEach} from "vitest";



import {shallowMount, VueWrapper} from "@vue/test-utils";
import User from "@/domain/model/User";
import { toastAlertStore, userInfoStore} from "@/main";
import {useRouter} from "vue-router";
const router = useRouter()

// let's mock vue router first
vi.mock("vue-router", () => {
    return {
        useRoute: vi.fn().mockReturnValue({}),
        createWebHashHistory: vi.fn().mockReturnValue({}),
        useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
        createRouter: vi.fn().mockReturnValue({}),
    };
});

describe("HeaderBar", () => {
    let wrapper: VueWrapper = null

    afterEach(() => {
        wrapper.unmount()
        vi.resetModules()
    })

    it("show user info when user is logged in", async () => {
        vi.doMock("@/main", async () => {
            userInfoStore.user = new User("id1", "name1", "email1@gmail.com")
            userInfoStore.isLogin = true
            return {
                userInfoStore: userInfoStore
            }
        })

        // now we can render the component
        const { default: HeaderBar } = await import("@/view/components/HeaderBar.vue");
        wrapper = shallowMount(HeaderBar, {});

        expect(wrapper.find(".guest").exists()).toBe(false);
        expect(wrapper.find(".user").exists()).toBe(true);
        expect(wrapper.find(".user > span").text()).toBe("name1");
        expect(wrapper.find("#logout").exists()).toBe(true);
    })

    it("show guest when user is not logged in", async () => {
        vi.doMock("@/main", async () => {
            userInfoStore.user = null
            userInfoStore.isLogin = false
            return {
                userInfoStore: userInfoStore
            }
        })

        // now we can render the component
        const { default: HeaderBar } = await import("@/view/components/HeaderBar.vue");
        wrapper = shallowMount(HeaderBar, {});

        expect(wrapper.find(".guest").exists()).toBe(true);
        expect(wrapper.find("#login").exists()).toBe(true);
        expect(wrapper.find(".user").exists()).toBe(false);
    })

    it("click logout button then clean user info", async () => {
        vi.doMock("@/main", async () => {
            userInfoStore.user = new User("id1", "name1", "email1@gmail.com")
            userInfoStore.isLogin = true
            const mockValidateResult = {
                isValid: true,
                errors: []
            };
            const mockValidator = {
                validate: vi.fn().mockReturnValue(mockValidateResult),
            };
            const mockHandler = {
                handle: () => userInfoStore.logout()
            }
            const mockCommandFactory = {
                getCommandValidator: vi.fn().mockReturnValue(mockValidator),
                getCommandHandler: vi.fn().mockReturnValue(mockHandler)
            };

            return {
                userInfoStore: userInfoStore,
                commandFactory: mockCommandFactory,
                toastAlertStore: toastAlertStore
            }
        })


        // click the logout button
        const { default: HeaderBar } = await import("@/view/components/HeaderBar.vue");
        wrapper = shallowMount(HeaderBar, {});
        await wrapper.find("#logout").trigger("click");
        expect(userInfoStore.isLogin).toBe(false);
        expect(userInfoStore.user).toBe(null);
        expect(wrapper.find(".guest").exists()).toBe(true);
        expect(wrapper.find("#login").exists()).toBe(true);
        expect(wrapper.find(".user").exists()).toBe(false);
    })

    it("click logout button but failed then show fail message", async () => {
        const user = new User("id1", "name1", "email1@gmail.com")
        vi.doMock("@/main", async () => {
            userInfoStore.user = user
            userInfoStore.isLogin = true
            const mockValidateResult = {
                isValid: false,
                errorCode: ["mock error"]
            };
            const mockValidator = {
                validate: vi.fn().mockReturnValue(mockValidateResult),
                getValidationMessage: vi.fn().mockReturnValue("mock error")
            };
            const mockHandler = {
                handle: () => userInfoStore.logout()
            }
            const mockCommandFactory = {
                getCommandValidator: vi.fn().mockReturnValue(mockValidator),
                getCommandHandler: vi.fn().mockReturnValue(mockHandler)
            };

            return {
                userInfoStore: userInfoStore,
                commandFactory: mockCommandFactory,
                toastAlertStore: toastAlertStore
            }
        })


        // click the logout button
        const { default: HeaderBar } = await import("@/view/components/HeaderBar.vue");
        wrapper = shallowMount(HeaderBar, {});
        await wrapper.find("#logout").trigger("click");
        expect(userInfoStore.isLogin).toBe(true);
        expect(userInfoStore.user).toEqual(user);

        expect(wrapper.find(".guest").exists()).toBe(false);
        expect(wrapper.find(".user").exists()).toBe(true);

        // toast alert should be shown
        expect(toastAlertStore.msg).toBe("mock error");
        expect(toastAlertStore.showToast).toBe(true);

    })

    it("click login button redirect to Login page", async () => {
        vi.doMock("@/main", async () => {
            userInfoStore.user = null
            userInfoStore.isLogin = false
            return {
                userInfoStore: userInfoStore
            }
        })

        const { default: HeaderBar } = await import("@/view/components/HeaderBar.vue");
        wrapper = shallowMount(HeaderBar, {});
        const loginBtn = wrapper.find('#login')
        await loginBtn.trigger('click')

        expect(router.push).toHaveBeenCalledWith({ name: 'Login' })
    })

    it("click NavItem redirect to specific page", async () => {
        const { default: HeaderBar } = await import("@/view/components/HeaderBar.vue");
        wrapper = shallowMount(HeaderBar, {});
        const navItems = wrapper.findAll('.nav-links-container li')
        for (const item of navItems) {
            const keyName = item.attributes('data-key')
            await item.trigger('click')
            expect(router.push).toHaveBeenCalledWith({ name: keyName })
        }

    })
})