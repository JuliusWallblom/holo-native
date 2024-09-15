import { Platform } from "react-native";

export const APOLLO_CLIENT_ENDPOINT: Readonly<string | null> = Platform.OS === 'android' 
? 'http://10.0.2.2:5143/graphql' 
: 'http://localhost:5143/graphql'
