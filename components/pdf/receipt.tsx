import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const colors = {
  bg: "#fcfcfc", // body
  card: "#fff", // white
  text: "#323743", // brand (from --color-brand)
  textMuted: "#7b7b93",
  border: "#e5e7eb", // gray-200
  accent: "#0D1321", // dark
  tableHeader: "#f8fafc", // sidebar-body
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bg,
    color: colors.text,
    fontSize: 12,
    fontFamily: "Helvetica",
    padding: 0,
    flexDirection: "column",
    minHeight: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: colors.card,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    // marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 90,
    // paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 28,
    paddingBottom: 28,
    justifyContent: "space-between",
  },
  logo: {
    width: 190,
    height: 40,
    objectFit: "contain",
  },
  companyInfoBlock: {
    flexDirection: "column",
    alignItems: "flex-end",
    textAlign: "right",
    gap: 2,
    marginTop: 4,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 2,
    letterSpacing: 2,
    fontFamily: "Helvetica-Bold",
  },
  companyDetails: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 1,
    fontFamily: "Helvetica",
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    boxShadow: "0 2px 8px #e5e7eb",
    marginHorizontal: 20,
    marginTop: 0,
    padding: 36,
    // marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  receiptTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 10,
    letterSpacing: 2,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
  receiptMetaRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18,
    gap: 24,
  },
  receiptMeta: {
    fontSize: 12,
    color: colors.textMuted,
    marginRight: 24,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 18,
  },
  billTo: {
    fontWeight: "bold",
    marginBottom: 4,
    color: colors.accent,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
  },
  tableWrap: {
    marginTop: 18,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 32,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.tableHeader,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableCellHeader: {
    color: colors.accent,
    fontWeight: "bold",
    padding: 14,
    flex: 1,
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
  },

  tableCellHeaderFirst: {
    color: colors.accent,
    fontWeight: "bold",
    padding: 14,
    flex: 2,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  tableCell: {
    padding: 14,
    flex: 1,
    fontSize: 12,
    color: colors.text,
    textAlign: "center",
    fontFamily: "Helvetica",
  },

  tableCellFirst: {
    padding: 14,
    flex: 2,
    fontSize: 12,
    color: colors.text,
    textAlign: "left",
    fontFamily: "Helvetica",
  },
  tableCellLast: {
    padding: 14,
    flex: 1,
    fontSize: 12,
    color: colors.text,
    textAlign: "right",
    fontFamily: "Helvetica",
  },
  tableCellAccent: {
    color: colors.accent,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: colors.tableHeader,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  totalCellFirst: {
    padding: 14,
    flex: 2,
    fontSize: 12,
    color: colors.text,
    textAlign: "left",
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  totalCellLast: {
    padding: 14,
    flex: 1,
    fontSize: 12,
    color: colors.text,
    textAlign: "center",
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  totalCell: {
    padding: 14,
    flex: 1,
    fontSize: 14,
    color: colors.accent,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  thankYou: {
    marginTop: 32,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent,
    letterSpacing: 2,
    fontFamily: "Helvetica-Bold",
  },
  note: {
    textAlign: "center",
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 8,
    fontFamily: "Helvetica",
  },
  footer: {
    backgroundColor: colors.card,
    // borderTopLeftRadius: 18,
    // borderTopRightRadius: 18,
    boxShadow: "0 -2px 12px #e5e7eb",
    padding: 24,
    alignItems: "center",
    // marginTop: 32,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  contacts: {
    // marginBottom: 0,
    // paddingBottom: 0,
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 11,
    textAlign: "center",
    fontFamily: "Helvetica",
  },
});

const company = {
  siteName: "Vision Engine AI",
  name: "ANTEROSIA LTD",
  number: "14539966",
  address: "41 Devonshire Street, Ground Floor,",
  address2: "London, United Kingdom, W1G 7AJ",
  website: "visionengineai.com",
  email: "support@visionengineai.com",
  logo: "assets/images/logo-receipt.png",
};

const Receipt = ({
  receiptId = "0000001",
  email = "user@email.com",
  date = `${Date.now()}`,
  tokens,
  description,
  amount,
  currency,
}: {
  receiptId?: string;
  email: string;
  date: string;
  tokens: number;
  description: string;
  amount: number;
  currency: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image style={styles.logo} src={company.logo} />
        <View style={styles.companyInfoBlock}>
          <Text style={styles.companyDetails}>{company.website}</Text>
          <Text style={styles.companyDetails}>{company.email}</Text>
        </View>
      </View>
      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.receiptTitle}>Receipt #{receiptId}</Text>
        <View style={styles.receiptMetaRow}>
          <Text style={styles.receiptMeta}>Date: {date}</Text>
        </View>
        {/* Bill To Section */}
        <View style={styles.section}>
          <Text style={styles.billTo}>Billed To:</Text>
          <Text>{email}</Text>
        </View>
        {/* Table */}
        <View style={styles.tableWrap}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellHeaderFirst}>Description</Text>
            <Text style={styles.tableCellHeader}>Tokens</Text>
            <Text style={styles.tableCellHeader}>Total</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellFirst}>{description}</Text>
            <Text style={[styles.tableCell]}>{tokens}</Text>
            <Text style={[styles.tableCell]}>
              {(amount / 100).toFixed(2)} {currency}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalCellFirst}>Total</Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.totalCellLast}>
              {(amount / 100).toFixed(2)} {currency}
            </Text>
          </View>
        </View>
        {/* Thank You Section */}
        <Text style={styles.thankYou}>
          Thank you for choosing {company.siteName}!
        </Text>
        <Text style={styles.note}>
          If you have any questions, please contact us at {company.email}
        </Text>
      </View>
      {/* Footer: Contacts */}
      <View style={styles.footer} fixed>
        <Text style={styles.companyName}>{company.name}</Text>
        <Text style={styles.contacts}>{company.address}</Text>
        <Text style={styles.contacts}>{company.address2}</Text>
        <Text style={styles.contacts}>
          {company.website} | {company.email}
        </Text>
      </View>
    </Page>
  </Document>
);

export default Receipt;
