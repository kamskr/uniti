import type { SheetProps } from "tamagui";
import { memo, useState } from "react";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { Button, H2, Input, Paragraph, Sheet, YStack } from "tamagui";

export function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[60]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          backgroundColor="$shadow6"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Frame
          padding="$4"
          justifyContent="center"
          alignItems="center"
          gap="$5"
        >
          <Sheet.Handle />
          <Sheet.Frame
            padding="$4"
            justifyContent="center"
            alignItems="center"
            gap="$5"
          >
            <SheetContents {...{ setOpen }} />
          </Sheet.Frame>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
// in general good to memoize the contents to avoid expensive renders during animations
const SheetContents = memo(
  ({ modal, isPercent, innerOpen, setInnerOpen, setOpen }: any) => {
    return (
      <>
        <Button
          size="$6"
          circular
          icon={ChevronDown}
          onPress={() => setOpen(false)}
        />
        <Input width={200} />
        {modal && isPercent && (
          <>
            <InnerSheet open={innerOpen} onOpenChange={setInnerOpen} />
            <Button
              size="$6"
              circular
              icon={ChevronUp}
              onPress={() => setInnerOpen(true)}
            />
          </>
        )}
      </>
    );
  },
);

function InnerSheet(props: SheetProps) {
  return (
    <Sheet
      animation="medium"
      modal
      snapPoints={[90]}
      dismissOnSnapToBottom
      {...props}
    >
      <Sheet.Overlay
        animation="medium"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />
      <Sheet.Frame
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="$5"
      >
        <Sheet.ScrollView>
          <YStack padding="$5" gap="$8">
            <Button
              size="$6"
              circular
              alignSelf="center"
              icon={ChevronDown}
              onPress={() => props.onOpenChange?.(false)}
            />

            <H2>Hello world</H2>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Paragraph key={i} size="$8">
                Eu officia sunt ipsum nisi dolore labore est laborum laborum in
                esse ad pariatur. Dolor excepteur esse deserunt voluptate labore
                ea. Exercitation ipsum deserunt occaecat cupidatat consequat est
                adipisicing velit cupidatat ullamco veniam aliquip reprehenderit
                officia. Officia labore culpa ullamco velit. In sit occaecat
                velit ipsum fugiat esse aliqua dolor sint.
              </Paragraph>
            ))}
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}
