import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Switch } from "react-native";
import Icon from "@react-native-vector-icons/fontawesome";
import { useSelector } from "react-redux";
export default function ProfileScreen({ navigation, route }) {
    const username = useSelector((state) => state.user.name);
    const [isNightMode, setIsNightMode] = React.useState(false);

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <Image
                    source={{ uri: "https://randomuser.me/api/portraits/women/33.jpg" }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{username}</Text>
                <Text style={styles.profileId}>ID: 83247963</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>135</Text>
                        <Text style={styles.statLabel}>Comments</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>209</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>26K</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>
                </View>
            </View>

            {/* Menu Options */}
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Account")}>
                    <Icon name="user" size={20} color="#4A90E2" />
                    <Text style={styles.menuText}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Bookshelf")}>
                    <Icon name="book" size={20} color="#4A90E2" />
                    <Text style={styles.menuText}>My Bookshelf</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("ReadingRecord")}>
                    <Icon name="history" size={20} color="#4A90E2" />
                    <Text style={styles.menuText}>Reading Record</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Cart")}>
                    <Icon name="shopping-cart" size={20} color="#4A90E2" />
                    <Text style={styles.menuText}>My Cart</Text>
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>4</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Night Mode */}
            <View style={styles.menuContainer}>
                <View style={styles.menuItem}>
                    <Icon name="moon-o" size={20} color="#4A90E2" />
                    <Text style={styles.menuText}>Night Mode</Text>
                    <Switch
                        value={isNightMode}
                        onValueChange={toggleNightMode}
                        thumbColor={isNightMode ? "#4A90E2" : "#f4f3f4"}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                    />
                </View>
            </View>

            {/* Additional Options */}
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("History")}>
                    <Icon name="clock-o" size={20} color="#4A90E2" />
                    <Text style={styles.menuText}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Settings")}>
                    <Icon name="cog" size={20} color="#4A90E2" />
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Feedback")}>
                    <Icon name="info-circle" size={20} color="#4A90E2" />
                    <Text style={styles.menuText}>Help and Feedback</Text>
                </TouchableOpacity>
            </View>

            {/* Logout */}
            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("Auth")}>
                    <Icon name="sign-out" size={20} color="#fff" />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F9F9",
    },
    header: {
        backgroundColor: "#4A90E2",
        padding: 20,
        alignItems: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#fff",
        marginBottom: 10,
    },
    profileName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    profileId: {
        fontSize: 14,
        color: "#fff",
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginBottom: 20,
    },
    editButtonText: {
        color: "#4A90E2",
        fontWeight: "bold",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    stat: {
        alignItems: "center",
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    statLabel: {
        fontSize: 12,
        color: "#fff",
    },
    menuContainer: {
        backgroundColor: "#fff",
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    menuText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        color: "#333",
    },
    cartBadge: {
        backgroundColor: "#dc3545",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    cartBadgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    logoutContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#dc3545",
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: "#fff",
        marginLeft: 5,
    },
});