import { Text } from "@shopify/polaris";

const WelcomeCard = ({
  title,
  description,
  icon,
  onPress,
  background,
}: {
  title: string;
  description?: string;
  icon?: any;
  onPress?: any;
  background: string;
}) => {
  return (
    <div
      className="ncpc-welcome-card"
      style={{ background: background }}
      onClick={() => {
        onPress && onPress();
      }}
    >
      <div className="ncpc-welcome-icon">{icon || ""}</div>
      <div>
        <Text as="span" fontWeight="bold" variant="bodyMd">
          {title}{" "}
        </Text>
        <Text as="p" variant="bodySm">
          {description || ""}{" "}
        </Text>
      </div>
    </div>
  );
};

export default WelcomeCard;
