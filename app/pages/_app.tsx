import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  lightTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { useMemo } from "react";
import { avalancheFuji, avalanche } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { useRouter } from "next/router";
import { ParticleNetwork } from "@particle-network/auth";
import { Avalanche, AvalancheTestnet } from "@particle-network/chains";

import { particleWallet } from "@particle-network/rainbowkit-ext";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

const id = "";

export default function App({ Component, pageProps }: AppProps) {
  const particle = useMemo(
    () =>
      new ParticleNetwork({
        // projectId: process.env.NEXT_APP_PROJECT_ID as string,
        projectId: "3552c5ec-1b10-42a4-ab7b-e54b7c1bbcd1",
        // clientKey: process.env.NEXT_APP_CLIENT_KEY as string,
        clientKey: "ccuwpVhsTeTbTQxbRd2YA4JbpNKdXZ8FKn3SA192",
        // appId: process.env.NEXT_APP_APP_ID as string,
        appId: "45df06db-c868-4e50-b620-5a5c1af565e9",
        chainName: AvalancheTestnet.name,
        chainId: AvalancheTestnet.id,
        wallet: { displayWalletEntry: true },
      }),
    []
  );

  const { chains, publicClient } = configureChains(
    [avalancheFuji, avalanche],
    [publicProvider()]
  );

  const commonOptions = {
    chains,
    // projectId: process.env.NEXT_APP_WALLETCONNECT_PROJECT_ID as string,
    projectId: "b1633334561c5cd849b272bd995beb2b",
  };

  const popularWallets = useMemo(
    () => ({
      groupName: "Popular",
      wallets: [
        particleWallet({ chains, authType: "google" }),
        particleWallet({ chains, authType: "facebook" }),
        particleWallet({ chains, authType: "apple" }),
        particleWallet({ chains }),
        rainbowWallet(commonOptions),
        coinbaseWallet({ appName: "RainbowKit demo", ...commonOptions }),
        metaMaskWallet(commonOptions),
        walletConnectWallet(commonOptions),
      ],
    }),
    [particle]
  );

  const connectors = connectorsForWallets([
    popularWallets,
    {
      groupName: "Other",
      wallets: [
        argentWallet(commonOptions),
        trustWallet(commonOptions),
        omniWallet(commonOptions),
        metaMaskWallet(commonOptions),
        ledgerWallet(commonOptions),
      ],
    },
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  const router = useRouter();
  const showHeader =
    router.pathname === "/create" || `/contribute/${id}` ? false : true;
  return (
    <ChakraProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#7b3fe4",
            accentColorForeground: "white",
            fontStack: "system",
          })}
          chains={chains}
        >
          {showHeader && <Navbar />}
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}
