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
        projectId: "4cea44ac-da24-4eae-83df-92a38c06b431",
        // clientKey: process.env.NEXT_APP_CLIENT_KEY as string,
        clientKey: "crCcYZ5a5mevKavfQR0MCSSoIQCVTAW4odMtcqSQ",
        // appId: process.env.NEXT_APP_APP_ID as string,
        appId: "ca427f7d-df60-4d5e-9692-d3915b3d7a9b",
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
    projectId: "891c774c3fec428fb8bafcec208355c3",
  };

  const popularWallets = useMemo(
    () => ({
      groupName: "Popular",
      wallets: [
        particleWallet({ chains, authType: "google" }),
        particleWallet({ chains, authType: "facebook" }),
        particleWallet({ chains, authType: "apple" }),
        particleWallet({ chains }),
        // rainbowWallet(commonOptions),
        // coinbaseWallet({ appName: "RainbowKit demo", ...commonOptions }),
        metaMaskWallet(commonOptions),
        // walletConnectWallet(commonOptions),
      ],
    }),
    [particle]
  );

  const connectors = connectorsForWallets([
    popularWallets,
    {
      groupName: "Other",
      wallets: [
        // argentWallet(commonOptions),
        // trustWallet(commonOptions),
        // omniWallet(commonOptions),
        // metaMaskWallet(commonOptions),
        // ledgerWallet(commonOptions),
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
