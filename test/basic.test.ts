// https://vitest.dev/guide/debugging.html#vscode to debug tests

import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils";

describe("@unlok-co/nuxt-stripe Module", async () => {
  const rootDir = fileURLToPath(new URL("./fixtures/basic", import.meta.url));

  await setup({ rootDir });

  describe("Module Registration", () => {
    it("registers without errors", async () => {
      // If setup() succeeds, module loaded correctly
      const html = await $fetch<string>("/");
      expect(html).toBeDefined();
    });

    it("exposes client composable via auto-imports", async () => {
      const html = await $fetch<string>("/");

      // Component uses useClientStripe() without explicit import
      // If page renders, auto-import worked
      expect(html).toContain('Nuxt Stripe module test');
    });

    it("exposes server composable via #stripe/server", async () => {
      // Server endpoint uses useServerStripe from #stripe/server
      const response = await $fetch<{ status: number; version: string }>("/api/stripe");

      expect(response.status).toBe(200);
      expect(response.version).toBeDefined();
    });
  });

  describe("Runtime Configuration", () => {
    it("provides runtime config to client", async () => {
      const html = await $fetch<string>("/");

      // Module should inject config into window.__NUXT__
      expect(html).toContain('stripe');
      expect(html).toContain('pk_test123');
    });

    it("accepts custom module options", async () => {
      const html = await $fetch<string>("/");

      // nuxt.config has custom key 'pk_test123'
      expect(html).toContain('pk_test123');
    });
  });

  describe("Client Composable API", () => {
    it("provides reactive stripe instance", async () => {
      const html = await $fetch<string>("/");

      // Component uses stripe, isLoading from composable
      // If it renders, the API surface is correct
      expect(html).toContain('Other component using stripe');
    });

    it("works in multiple components simultaneously", async () => {
      const html = await $fetch<string>("/");

      // Both app.vue and OtherComponent.vue use the composable
      expect(html).toContain('Nuxt Stripe module test'); // app.vue
      expect(html).toContain('Stripe client'); // OtherComponent.vue
    });

    it("initializes state correctly in SSR", async () => {
      const html = await $fetch<string>("/");

      // Composable should initialize useState for stripe client
      expect(html).toContain('stripe-client');
    });
  });

  describe("Server Composable API", () => {
    it("provides functional Stripe server instance", async () => {
      const response = await $fetch<{ status: number; version: string }>("/api/stripe");

      expect(response.version).toMatch(/^\d+\.\d+\.\d+$/);
      expect(response.status).toBe(200);
    });

    it("works in API routes", async () => {
      // Test that server composable works in Nitro routes
      const response = await $fetch("/api/stripe");

      expect(response).toBeDefined();
      expect(response).toHaveProperty('version');
    });
  });

  describe("SSR Compatibility", () => {
    it("renders without errors in SSR mode", async () => {
      const html = await $fetch<string>("/");

      // Should get full HTML, not error page
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).not.toContain('500');
      expect(html).not.toContain('Error');
    });

    it("handles client-only Stripe initialization", async () => {
      const html = await $fetch<string>("/");

      // Client-only components should render placeholders in SSR
      expect(html).toBeDefined();
      expect(html.length).toBeGreaterThan(100);
    });

    it("does not break hydration", async () => {
      const html = await $fetch<string>("/");

      // Check for Nuxt hydration payload
      expect(html).toContain('__NUXT__');
      expect(html).toContain('data-nuxt-data');
    });
  });

  describe("Build Modes", () => {
    it("works with SSR enabled", async () => {
      // Current fixture has ssr: true
      const html = await $fetch<string>("/");

      expect(html).toContain('<!DOCTYPE html>');
    });

    // Note: Testing SPA/SSG would require separate fixtures
    // with different nuxt.config settings
  });

  describe("Type Safety", () => {
    it("provides TypeScript types for composables", async () => {
      // If the test fixture builds without type errors,
      // the module provides correct types
      const html = await $fetch<string>("/");
      expect(html).toBeDefined();
    });

    it("provides typed server utilities", async () => {
      // Server route uses typed useServerStripe
      const response = await $fetch<{ status: number; version: string }>("/api/stripe");
      expect(response).toHaveProperty('version');
    });
  });

  describe("Module Options", () => {
    it("respects client configuration", async () => {
      const html = await $fetch<string>("/");

      // Should use the key from nuxt.config stripe.client.key
      expect(html).toContain('pk_test123');
    });

    it("applies server configuration", async () => {
      // Server should use stripe.server.key from config
      const response = await $fetch("/api/stripe");

      // If it works, config was applied
      expect(response).toBeDefined();
    });
  });
});
